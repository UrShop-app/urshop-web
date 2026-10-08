/** Blog index hero: what the blog is for, in one line. No readership claims. */
export function BlogHero() {
  return (
    <section
      aria-labelledby="blog-hero-heading"
      className="relative px-6 pt-14 pb-12 sm:pt-16 lg:px-12"
    >
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <span className="liquid-pill mb-8 inline-flex items-center justify-center rounded-full px-5 py-1.5 text-[12px] font-bold tracking-[0.18em] text-slate-600 uppercase select-none">
          Blog
        </span>
        <h1
          id="blog-hero-heading"
          className="mb-6 text-4xl leading-[1.15] font-extrabold tracking-tight text-balance text-slate-900 sm:text-5xl lg:text-6xl"
        >
          Practical ecommerce advice for <span className="cyan-underline px-1">Bangladesh</span>{" "}
          businesses
        </h1>
        <p className="mx-auto max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
          Products, payments, delivery and getting found, explained clearly.
        </p>
      </div>
    </section>
  );
}
