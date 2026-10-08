const BRAND_GRADIENT = "linear-gradient(135deg, rgb(2, 132, 199) 0%, rgb(8, 192, 216) 100%)";

/**
 * Round +/- indicator in the home page FAQ style, driven by the parent `<details>` (which needs
 * the `group` class). Used by the FAQ and Resources pages.
 */
export function DisclosureToggle() {
  return (
    <span
      aria-hidden="true"
      className="relative flex size-9 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-brand transition-[border-color,box-shadow,color] duration-300 group-open:border-transparent group-open:text-white group-open:shadow-[0_8px_18px_-6px_rgba(8,192,216,0.6)] group-hover:border-brand/40 motion-reduce:transition-none"
    >
      <span
        className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-open:opacity-100 motion-reduce:transition-none"
        style={{ background: BRAND_GRADIENT }}
      />
      <span className="absolute h-0.5 w-3.5 rounded-full bg-current" />
      <span className="absolute h-3.5 w-0.5 rounded-full bg-current transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-open:rotate-90 motion-reduce:transition-none" />
    </span>
  );
}
