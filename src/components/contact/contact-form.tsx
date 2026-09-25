"use client";

import { useId, useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";

import { Icon } from "@/components/ui/icon";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

import { CONTACT_TOPICS } from "./topics";

/** Field names, in the order they appear (the first invalid one gets focus). */
const FIELDS = ["name", "email", "phone", "business", "topic", "subject", "message"] as const;
type FieldName = (typeof FIELDS)[number];
type ContactValues = Record<FieldName, string>;
type FieldErrors = Partial<Record<FieldName, string>>;

const MESSAGE_MIN_LENGTH = 20;
// Kept short enough to fit in a mailto link, which some email apps cap at about 2,000 characters.
const MESSAGE_MAX_LENGTH = 1500;

const REQUIRED_MESSAGES: Partial<Record<FieldName, string>> = {
  name: "Enter your name.",
  email: "Enter your email address.",
  topic: "Choose what your message is about.",
  subject: "Add a subject.",
  message: "Write your message.",
};

/**
 * Error text for a field, from the browser's constraint validation. The rules themselves live on
 * the inputs (`required`, `type`, `pattern`, `minLength`), so a server can mirror them later.
 */
function errorFor(name: FieldName, validity: ValidityState): string | undefined {
  if (validity.valid) return undefined;
  if (validity.valueMissing) return REQUIRED_MESSAGES[name];
  if (validity.typeMismatch) return "Enter an email address like name@example.com.";
  if (validity.patternMismatch) return "Use digits, spaces, dashes and an optional leading +.";
  if (validity.tooShort) {
    return `Add a little more detail (at least ${MESSAGE_MIN_LENGTH} characters).`;
  }
  if (validity.tooLong) return "This is too long.";
  return "Check this field.";
}

/** The field's input, or the first radio of a radio group. */
function fieldElement(form: HTMLFormElement, name: FieldName) {
  return form.querySelector<HTMLInputElement | HTMLTextAreaElement>(`[name="${name}"]`);
}

function validate(form: HTMLFormElement): FieldErrors {
  const errors: FieldErrors = {};
  for (const name of FIELDS) {
    const element = fieldElement(form, name);
    const error = element ? errorFor(name, element.validity) : undefined;
    if (error) errors[name] = error;
  }
  return errors;
}

function readValues(form: HTMLFormElement): ContactValues {
  const data = new FormData(form);
  return Object.fromEntries(
    FIELDS.map((name) => [name, String(data.get(name) ?? "").trim()]),
  ) as ContactValues;
}

/**
 * Integration point. There is no contact backend yet, so a valid message becomes a pre-filled
 * draft in the visitor's own email app, and nothing is sent until they send it there. When a
 * contact API exists, replace this with the request and show its real result.
 */
function openEmailDraft(values: ContactValues) {
  const topic = CONTACT_TOPICS.find((item) => item.id === values.topic);
  const subject = topic ? `[${topic.label}] ${values.subject}` : values.subject;
  const details = [
    `Name: ${values.name}`,
    `Email: ${values.email}`,
    values.phone ? `Phone: ${values.phone}` : null,
    values.business ? `Store or business: ${values.business}` : null,
  ].filter((line) => line !== null);
  const body = [values.message, "", "---", ...details].join("\r\n");

  window.location.assign(
    `mailto:${siteConfig.supportEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
  );
}

const inputClass =
  "block w-full rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 text-base text-slate-900 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-[border-color,box-shadow] duration-200 placeholder:text-slate-400 focus:border-brand focus:ring-4 focus:ring-brand/15 focus:outline-none aria-invalid:border-rose-400 aria-invalid:focus:ring-rose-100";

/** Contact form UI. Validates on the client; see `openEmailDraft` for what submitting does. */
export function ContactForm() {
  const idPrefix = useId();
  const [errors, setErrors] = useState<FieldErrors>({});
  const [hasOpenedDraft, setHasOpenedDraft] = useState(false);

  const idFor = (name: FieldName) => `${idPrefix}-${name}`;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const nextErrors = validate(form);
    setErrors(nextErrors);

    const firstInvalid = FIELDS.find((name) => nextErrors[name]);
    if (firstInvalid) {
      setHasOpenedDraft(false);
      fieldElement(form, firstInvalid)?.focus();
      return;
    }

    openEmailDraft(readValues(form));
    setHasOpenedDraft(true);
  };

  // Once a field shows an error, re-check it as the visitor fixes it.
  const handleChange = (event: ChangeEvent<HTMLFormElement>) => {
    const target = event.target as unknown as HTMLInputElement | HTMLTextAreaElement;
    const name = target.name as FieldName;
    if (!errors[name]) return;
    setErrors((current) => ({ ...current, [name]: errorFor(name, target.validity) }));
  };

  const fieldProps = (name: FieldName, { hasHint = false } = {}) => ({
    id: idFor(name),
    name,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby":
      [hasHint && `${idFor(name)}-hint`, errors[name] && `${idFor(name)}-error`]
        .filter(Boolean)
        .join(" ") || undefined,
  });

  return (
    <form noValidate onSubmit={handleSubmit} onChange={handleChange} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Your name" id={idFor("name")} error={errors.name}>
          <input
            {...fieldProps("name")}
            type="text"
            autoComplete="name"
            required
            maxLength={100}
            className={inputClass}
          />
        </Field>
        <Field label="Email" id={idFor("email")} error={errors.email}>
          <input
            {...fieldProps("email")}
            type="email"
            autoComplete="email"
            required
            maxLength={254}
            spellCheck={false}
            className={inputClass}
          />
        </Field>
        <Field label="Phone" optional id={idFor("phone")} error={errors.phone}>
          <input
            {...fieldProps("phone")}
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            pattern="\+?[0-9][0-9 \-]{5,19}"
            maxLength={20}
            className={inputClass}
          />
        </Field>
        <Field
          label="Store or business name"
          optional
          id={idFor("business")}
          error={errors.business}
        >
          <input
            {...fieldProps("business")}
            type="text"
            autoComplete="organization"
            maxLength={120}
            className={inputClass}
          />
        </Field>
      </div>

      <fieldset aria-describedby={errors.topic ? `${idFor("topic")}-error` : undefined}>
        <legend className="text-sm font-bold text-slate-900">What&apos;s this about?</legend>
        <div className="mt-2.5 grid gap-2.5 sm:grid-cols-2">
          {CONTACT_TOPICS.map((topic, index) => (
            <label
              key={topic.id}
              className={cn(
                "flex cursor-pointer items-center gap-3 rounded-2xl border bg-white/90 px-4 py-3 text-sm font-semibold text-slate-700 transition-colors duration-200 hover:border-brand/40 has-checked:border-brand has-checked:bg-brand-light/70 has-checked:text-slate-900 has-focus-visible:ring-4 has-focus-visible:ring-brand/20",
                errors.topic ? "border-rose-400" : "border-slate-200",
              )}
            >
              <input
                type="radio"
                name="topic"
                value={topic.id}
                required
                // Focus target for the group's error (the first radio).
                id={index === 0 ? idFor("topic") : undefined}
                className="size-4 shrink-0 accent-brand-dark"
              />
              <Icon name={topic.icon} className="text-brand" />
              {topic.label}
            </label>
          ))}
        </div>
        <FieldError id={`${idFor("topic")}-error`} error={errors.topic} />
      </fieldset>

      <Field label="Subject" id={idFor("subject")} error={errors.subject}>
        <input
          {...fieldProps("subject")}
          type="text"
          required
          maxLength={150}
          className={inputClass}
        />
      </Field>

      <Field
        label="Message"
        id={idFor("message")}
        hint={`At least ${MESSAGE_MIN_LENGTH} characters. Please don't include passwords or payment details.`}
        error={errors.message}
      >
        <textarea
          {...fieldProps("message", { hasHint: true })}
          required
          rows={6}
          minLength={MESSAGE_MIN_LENGTH}
          maxLength={MESSAGE_MAX_LENGTH}
          className={cn(inputClass, "min-h-40 resize-y")}
        />
      </Field>

      <div className="flex flex-col gap-4 border-t border-slate-200/80 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-sm text-xs leading-relaxed text-slate-500">
          This opens a pre-filled email to {siteConfig.supportEmail} in your email app. Nothing is
          sent until you press Send there.
        </p>
        <button
          type="submit"
          className="inline-flex h-12 shrink-0 cursor-pointer items-center justify-center gap-2 rounded-full border px-7 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark active:scale-95"
          style={{
            background: "linear-gradient(135deg, rgba(8, 192, 216, 0.96), rgba(2, 132, 199, 0.96))",
            borderColor: "rgba(255, 255, 255, 0.65)",
            boxShadow:
              "0 8px 24px -4px rgba(2, 132, 199, 0.4), inset 0 1.5px 2px rgba(255, 255, 255, 0.75)",
          }}
        >
          <Icon name="mail" />
          Continue in email
        </button>
      </div>

      <p role="status" className="text-sm leading-relaxed text-slate-600 empty:hidden">
        {hasOpenedDraft ? (
          <>
            Your email app should now show your message, ready to send. If nothing opened, email{" "}
            <a
              href={`mailto:${siteConfig.supportEmail}`}
              className="font-semibold text-brand-dark underline underline-offset-4"
            >
              {siteConfig.supportEmail}
            </a>{" "}
            directly. What you typed is still here to copy.
          </>
        ) : null}
      </p>
    </form>
  );
}

function Field({
  id,
  label,
  optional = false,
  hint,
  error,
  children,
}: {
  /** The control's id; the hint and error use `${id}-hint` and `${id}-error`. */
  id: string;
  label: string;
  optional?: boolean;
  hint?: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="flex items-baseline justify-between gap-2">
        <span className="text-sm font-bold text-slate-900">{label}</span>
        {optional ? <span className="text-xs font-medium text-slate-400">Optional</span> : null}
      </label>
      <div className="mt-2">{children}</div>
      {hint ? (
        <p id={`${id}-hint`} className="mt-2 text-xs leading-relaxed text-slate-500">
          {hint}
        </p>
      ) : null}
      <FieldError id={`${id}-error`} error={error} />
    </div>
  );
}

function FieldError({ id, error }: { id: string; error?: string }) {
  if (!error) return null;
  return (
    <p id={id} className="mt-2 text-sm font-medium text-rose-600">
      {error}
    </p>
  );
}
