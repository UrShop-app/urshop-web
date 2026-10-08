"use client";

import { AnimatePresence, MotionConfig, motion, type Variants } from "motion/react";
import Link from "next/link";
import { useEffect, useId, useRef, useState, type ChangeEvent, type FormEvent } from "react";

import { Field, FieldError, inputClass, SubmitButton } from "@/components/ui/form-field";
import { Icon } from "@/components/ui/icon";
import { legalDocuments } from "@/config/legal";
import { siteConfig } from "@/config/site";
import {
  HONEYPOT_FIELD,
  INTAKE_FIELDS,
  INTAKE_LIMITS,
  REPORT_CATEGORIES,
  STARTED_AT_FIELD,
  validateIntake,
  type IntakeErrors,
  type IntakeField,
  type IntakeKind,
  type IntakeResponse,
  type IntakeValues,
} from "@/lib/support-intake/fields";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";

const ENDPOINTS: Record<IntakeKind, string> = {
  report: "/api/public/report",
  "feature-request": "/api/public/feature-request",
};

const COPY = {
  report: {
    heading: "Tell us what happened",
    titleLabel: "Subject",
    titleHint: "e.g. “Order status won’t update”",
    descriptionLabel: "Description",
    descriptionHint: "What happened, what you expected, and how to repeat it.",
    pageUrlHint: "Where it happened.",
    submit: "Send report",
    successTitle: "Thanks, we’ve got it!",
    successBody: "We’ll look into it and reach out if we need more details.",
    another: "Send another",
  },
  "feature-request": {
    heading: "Share your idea",
    titleLabel: "Feature title",
    titleHint: "e.g. “Bulk-edit product prices”",
    descriptionLabel: "Description / use case",
    descriptionHint: "The problem, who it’s for, and what UrShop should do.",
    pageUrlHint: "A related page or example.",
    submit: "Send idea",
    successTitle: "Thanks for the idea!",
    successBody: "We read every request. Sending one doesn’t guarantee it will be built.",
    another: "Share another",
  },
} as const satisfies Record<IntakeKind, Record<string, string>>;

const EMPTY_VALUES: IntakeValues = {
  name: "",
  email: "",
  phone: "",
  category: "",
  title: "",
  description: "",
  pageUrl: "",
};

type Status =
  | { state: "idle" }
  | { state: "submitting" }
  | { state: "error"; message: string }
  | { state: "success"; reference: string | null };

const EASE = [0.22, 1, 0.36, 1] as const;

/** How long the card keeps its height after submitting, while the page scrolls up to it. */
const HOLD_HEIGHT_MS = 650;

function failureMessage(response: IntakeResponse | null): string {
  if (!response || response.ok) {
    return "Couldn’t send that. Check your connection and try again.";
  }
  switch (response.code) {
    case "VALIDATION_FAILED":
      return "A few fields need another look.";
    case "RATE_LIMITED":
      return "That’s a lot of submissions. Please try again a little later.";
    case "UNAVAILABLE":
      return `We can’t take submissions right now. Try later or email ${siteConfig.supportEmail}.`;
    default:
      return "Something went wrong on our side. Please try again.";
  }
}

/**
 * The /report and /feature-request card. Validation here is for the visitor's benefit only;
 * the UrShop backend re-validates everything and owns the real rules.
 *
 * Swapping the long form for the short confirmation would collapse the page under the visitor.
 * Instead the card keeps its height, scrolls its top into view, then eases down to fit.
 */
export function IntakeForm({ kind }: { kind: IntakeKind }) {
  const copy = COPY[kind];
  const fields = INTAKE_FIELDS[kind];
  const idPrefix = useId();
  const reducedMotion = usePrefersReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const submittingRef = useRef(false);
  const startedAtRef = useRef(0);
  const releaseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [values, setValues] = useState<IntakeValues>(EMPTY_VALUES);
  const [errors, setErrors] = useState<IntakeErrors>({});
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const [heldHeight, setHeldHeight] = useState<number | null>(null);

  // Set on the client (not during prerender) so it measures how long the visitor took.
  useEffect(() => {
    startedAtRef.current = Date.now();
    return () => {
      if (releaseTimerRef.current) clearTimeout(releaseTimerRef.current);
    };
  }, []);

  const idFor = (name: IntakeField) => `${idPrefix}-${name}`;
  const submitting = status.state === "submitting";

  const focusField = (name: IntakeField) => {
    formRef.current?.querySelector<HTMLElement>(`#${CSS.escape(idFor(name))}`)?.focus();
  };

  const showSuccess = (reference: string | null) => {
    const root = rootRef.current;
    if (root) {
      setHeldHeight(root.offsetHeight);
      // The visitor is usually at the submit button, far below the card's top.
      if (root.getBoundingClientRect().top < 120) {
        root.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
      }
    }
    setStatus({ state: "success", reference });
    if (releaseTimerRef.current) clearTimeout(releaseTimerRef.current);
    releaseTimerRef.current = setTimeout(
      () => setHeldHeight(null),
      reducedMotion ? 0 : HOLD_HEIGHT_MS,
    );
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const name = event.target.name as IntakeField;
    const nextValues = { ...values, [name]: event.target.value };
    setValues(nextValues);
    // Once a field shows an error, re-check it as the visitor fixes it.
    if (errors[name]) {
      setErrors((current) => ({ ...current, [name]: validateIntake(kind, nextValues)[name] }));
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submittingRef.current) return;

    const nextErrors = validateIntake(kind, values);
    setErrors(nextErrors);
    const firstInvalid = fields.find((name) => nextErrors[name]);
    if (firstInvalid) {
      setStatus({ state: "idle" });
      focusField(firstInvalid);
      return;
    }

    submittingRef.current = true;
    setStatus({ state: "submitting" });

    const honeypot = new FormData(event.currentTarget).get(HONEYPOT_FIELD);
    let result: IntakeResponse | null = null;
    try {
      const response = await fetch(ENDPOINTS[kind], {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...Object.fromEntries(fields.map((name) => [name, (values[name] ?? "").trim()])),
          [HONEYPOT_FIELD]: typeof honeypot === "string" ? honeypot : "",
          [STARTED_AT_FIELD]: startedAtRef.current,
        }),
      });
      result = (await response.json().catch(() => null)) as IntakeResponse | null;
    } catch {
      result = null;
    } finally {
      submittingRef.current = false;
    }

    if (result?.ok) {
      showSuccess(result.reference);
      return;
    }

    if (result && !result.ok && result.fieldErrors) {
      const serverErrors = result.fieldErrors;
      setErrors(serverErrors);
      const firstServerInvalid = fields.find((name) => serverErrors[name]);
      if (firstServerInvalid) focusField(firstServerInvalid);
    }
    setStatus({ state: "error", message: failureMessage(result) });
  };

  const startAgain = () => {
    setValues(EMPTY_VALUES);
    setErrors({});
    setStatus({ state: "idle" });
    startedAtRef.current = Date.now();
  };

  const fieldProps = (name: IntakeField, { hasHint = false } = {}) => ({
    id: idFor(name),
    name,
    value: values[name] ?? "",
    onChange: handleChange,
    disabled: submitting,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby":
      [hasHint && `${idFor(name)}-hint`, errors[name] && `${idFor(name)}-error`]
        .filter(Boolean)
        .join(" ") || undefined,
  });

  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        ref={rootRef}
        className="scroll-mt-36 md:scroll-mt-44"
        initial={false}
        animate={{ minHeight: heldHeight ?? 0 }}
        transition={heldHeight === null ? { duration: 0.6, ease: EASE } : { duration: 0 }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {status.state === "success" ? (
            <SuccessPanel
              key="success"
              title={copy.successTitle}
              body={copy.successBody}
              reference={status.reference}
              anotherLabel={copy.another}
              onAnother={startAgain}
            />
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE } }}
              exit={{ opacity: 0, y: -8, transition: { duration: 0.18 } }}
            >
              <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                {copy.heading}
              </h2>
              <p className="mt-2 mb-8 text-sm text-slate-500">
                All fields are required unless marked Optional.
              </p>

              <form
                ref={formRef}
                noValidate
                onSubmit={handleSubmit}
                className="relative space-y-6"
                aria-busy={submitting}
              >
                <div className="grid gap-6 sm:grid-cols-2">
                  <Field label="Your name" id={idFor("name")} error={errors.name}>
                    <input
                      {...fieldProps("name")}
                      type="text"
                      autoComplete="name"
                      maxLength={INTAKE_LIMITS.nameMax}
                      className={inputClass}
                    />
                  </Field>
                  <Field label="Email" id={idFor("email")} error={errors.email}>
                    <input
                      {...fieldProps("email")}
                      type="email"
                      autoComplete="email"
                      maxLength={INTAKE_LIMITS.emailMax}
                      spellCheck={false}
                      className={inputClass}
                    />
                  </Field>
                  <Field
                    label="Mobile number"
                    id={idFor("phone")}
                    hint="Add your country code if outside Bangladesh."
                    error={errors.phone}
                  >
                    <input
                      {...fieldProps("phone", { hasHint: true })}
                      type="tel"
                      autoComplete="tel"
                      inputMode="tel"
                      maxLength={INTAKE_LIMITS.phoneMax}
                      className={inputClass}
                    />
                  </Field>
                </div>

                {kind === "report" ? (
                  <fieldset
                    disabled={submitting}
                    aria-describedby={errors.category ? `${idFor("category")}-error` : undefined}
                  >
                    <legend className="text-sm font-bold text-slate-900">
                      What&apos;s it about?
                    </legend>
                    <div className="mt-2.5 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                      {REPORT_CATEGORIES.map((category, index) => (
                        <label
                          key={category.id}
                          className={cn(
                            "group flex cursor-pointer flex-col gap-1.5 rounded-2xl border bg-white/90 px-3.5 py-3 text-sm text-slate-700 transition-[border-color,background-color,box-shadow,transform] duration-200 hover:-translate-y-px hover:border-brand/40 hover:shadow-[0_8px_20px_-12px_rgba(2,132,199,0.35)] has-checked:border-brand has-checked:bg-brand-light/70 has-checked:text-slate-900 has-focus-visible:ring-4 has-focus-visible:ring-brand/20",
                            errors.category ? "border-rose-400" : "border-slate-200",
                          )}
                        >
                          <span className="flex items-center justify-between">
                            <Icon
                              name={category.icon}
                              className="text-brand transition-transform duration-300 group-has-checked:scale-115"
                            />
                            <input
                              type="radio"
                              name="category"
                              value={category.id}
                              checked={values.category === category.id}
                              onChange={handleChange}
                              // Focus target for the group's error (the first radio).
                              id={index === 0 ? idFor("category") : undefined}
                              className="size-4 shrink-0 accent-brand-dark"
                            />
                          </span>
                          <span className="font-semibold">{category.label}</span>
                          <span className="text-xs leading-snug text-slate-500">
                            {category.hint}
                          </span>
                        </label>
                      ))}
                    </div>
                    <FieldError id={`${idFor("category")}-error`} error={errors.category} />
                  </fieldset>
                ) : null}

                <Field
                  label={copy.titleLabel}
                  id={idFor("title")}
                  hint={copy.titleHint}
                  error={errors.title}
                >
                  <input
                    {...fieldProps("title", { hasHint: true })}
                    type="text"
                    maxLength={INTAKE_LIMITS.titleMax}
                    className={inputClass}
                  />
                </Field>

                <Field
                  label={copy.descriptionLabel}
                  id={idFor("description")}
                  hint={copy.descriptionHint}
                  error={errors.description}
                >
                  <textarea
                    {...fieldProps("description", { hasHint: true })}
                    rows={6}
                    maxLength={INTAKE_LIMITS.descriptionMax}
                    className={cn(inputClass, "min-h-40 resize-y")}
                  />
                </Field>

                <Field
                  label="Relevant page URL"
                  optional
                  id={idFor("pageUrl")}
                  hint={copy.pageUrlHint}
                  error={errors.pageUrl}
                >
                  <input
                    {...fieldProps("pageUrl", { hasHint: true })}
                    type="url"
                    inputMode="url"
                    placeholder="https://"
                    maxLength={INTAKE_LIMITS.pageUrlMax}
                    spellCheck={false}
                    className={inputClass}
                  />
                </Field>

                {/* Honeypot: invisible to people and assistive tech; bots that fill it are dropped. */}
                <div
                  aria-hidden="true"
                  className="absolute -left-[10000px] h-px w-px overflow-hidden"
                >
                  <label>
                    Website
                    <input
                      type="text"
                      name={HONEYPOT_FIELD}
                      tabIndex={-1}
                      autoComplete="off"
                      defaultValue=""
                    />
                  </label>
                </div>

                <AnimatePresence initial={false}>
                  {status.state === "error" ? (
                    <motion.div
                      key="error"
                      role="alert"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <div className="flex items-start gap-3 rounded-2xl border border-rose-200 bg-rose-50/90 px-4 py-3 text-sm font-medium text-rose-700">
                        <Icon name="info" className="shrink-0" />
                        <span className="pt-0.5">{status.message}</span>
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>

                <div className="flex flex-col gap-4 border-t border-slate-200/80 pt-6 sm:flex-row sm:items-center sm:justify-between">
                  <p className="max-w-sm text-xs leading-relaxed text-slate-500">
                    We&apos;ll use your details to review and follow up on your submission.
                    Don&apos;t include passwords, API keys, payment credentials, or other secrets.
                    See our{" "}
                    <Link
                      href={legalDocuments.privacyPolicy.path}
                      className="font-semibold text-brand-dark underline underline-offset-4"
                    >
                      Privacy Policy
                    </Link>
                    .
                  </p>
                  <SubmitButton disabled={submitting}>
                    <Icon
                      name={submitting ? "progress_activity" : "send"}
                      className={cn(submitting && "animate-spin")}
                    />
                    {submitting ? "Sending…" : copy.submit}
                  </SubmitButton>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </MotionConfig>
  );
}

const panel: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};

const rise: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
};

const pop: Variants = {
  hidden: { opacity: 0, scale: 0.6 },
  show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 260, damping: 18 } },
};

function SuccessPanel({
  title,
  body,
  reference,
  anotherLabel,
  onAnother,
}: {
  title: string;
  body: string;
  reference: string | null;
  anotherLabel: string;
  onAnother: () => void;
}) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [copied, setCopied] = useState(false);

  // Move focus to the confirmation so keyboard and screen-reader users land on it.
  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true });
  }, []);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  const copyReference = async () => {
    if (!reference) return;
    try {
      await navigator.clipboard.writeText(reference);
      setCopied(true);
    } catch {
      // Clipboard can be blocked; the reference is still on screen to copy by hand.
    }
  };

  return (
    <motion.div
      role="status"
      variants={panel}
      initial="hidden"
      animate="show"
      exit={{ opacity: 0, transition: { duration: 0.15 } }}
      className="flex flex-col items-center py-8 text-center sm:py-12"
    >
      <motion.div variants={pop} className="relative">
        <span aria-hidden="true" className="intake-success-ring absolute inset-0 rounded-full" />
        <span
          className="relative flex size-18 items-center justify-center rounded-full text-white shadow-[0_14px_32px_-10px_rgba(2,132,199,0.6)]"
          style={{ background: "linear-gradient(135deg, #08c0d8 0%, #0284c7 100%)" }}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" className="size-9">
            <motion.path
              d="M5 12.5l4.5 4.5L19 7.5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.6}
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.35, duration: 0.45, ease: EASE }}
            />
          </svg>
        </span>
      </motion.div>

      <motion.h2
        ref={headingRef}
        tabIndex={-1}
        variants={rise}
        className="mt-7 text-2xl font-extrabold tracking-tight text-slate-900 outline-none sm:text-3xl"
      >
        {title}
      </motion.h2>

      <motion.p
        variants={rise}
        className="mt-3 max-w-sm text-sm leading-relaxed text-slate-600 sm:text-base"
      >
        {body}
      </motion.p>

      {reference ? (
        <motion.div variants={rise} className="mt-6">
          <button
            type="button"
            onClick={copyReference}
            className="liquid-pill inline-flex items-center gap-2 rounded-full py-2 pr-3 pl-4 text-sm text-slate-600 transition-colors hover:text-slate-900"
            aria-label={`Reference ${reference}. Copy to clipboard`}
          >
            <span>Reference</span>
            <span className="font-stat font-bold tracking-wide text-slate-900">{reference}</span>
            <Icon name={copied ? "check" : "content_copy"} className="text-brand" />
          </button>
        </motion.div>
      ) : null}

      <motion.div
        variants={rise}
        className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
      >
        <button
          type="button"
          onClick={onAnother}
          className="glass-btn inline-flex h-11.5 items-center gap-2 rounded-full px-6 text-sm font-bold text-slate-700"
        >
          {anotherLabel}
        </button>
        <Link
          href="/"
          className="text-sm font-semibold text-slate-600 underline decoration-slate-300 underline-offset-4 transition-colors hover:text-slate-900 hover:decoration-brand"
        >
          Back to home
        </Link>
      </motion.div>
    </motion.div>
  );
}
