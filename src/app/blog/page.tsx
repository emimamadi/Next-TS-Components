import Link from "next/link";

const posts = [
  {
    title: "Designing a calmer workflow for busy teams",
    category: "Productivity",
    readTime: "5 min read",
    date: "May 18, 2026",
    excerpt:
      "How simple systems, clear priorities, and consistent rituals can reduce decision fatigue and improve execution across a team.",
  },
  {
    title: "Why thoughtful frontend architecture matters",
    category: "Engineering",
    readTime: "7 min read",
    date: "May 03, 2026",
    excerpt:
      "A practical look at component boundaries, shared state, and reusable patterns that help product teams move faster without friction.",
  },
  {
    title: "Shipping better user experiences with small wins",
    category: "UX",
    readTime: "4 min read",
    date: "Apr 22, 2026",
    excerpt:
      "Small, measurable enhancements often create the biggest gains in clarity, confidence, and trust for users navigating your product.",
  },
];

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-slate-100 px-6 py-12 text-slate-900">
      <div className="mx-auto max-w-6xl">
        <header className="mb-10 flex flex-col gap-5 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-600">
              Journal
            </p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight">Blog</h1>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/"
              className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 font-medium text-slate-700 transition hover:bg-slate-100"
            >
              Home
            </Link>
            <Link
              href="/dashboard"
              className="rounded-xl bg-indigo-600 px-4 py-2.5 font-medium text-white transition hover:bg-indigo-500"
            >
              Dashboard
            </Link>
          </div>
        </header>

        <section className="mb-8 overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-violet-600 to-sky-500 p-8 text-white shadow-lg">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-100">
              Featured story
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Building software that feels effortless for the people using it.
            </h2>
            <p className="mt-4 text-base text-indigo-50/90">
              Lessons from product design, engineering, and operations for teams shipping helpful,
              resilient experiences.
            </p>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.title}
              className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex items-center justify-between gap-3 text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
                <span>{post.category}</span>
                <span>{post.readTime}</span>
              </div>

              <h3 className="mt-5 text-2xl font-bold leading-tight text-slate-900">{post.title}</h3>
              <p className="mt-3 text-sm text-slate-500">{post.date}</p>

              <p className="mt-4 flex-1 text-base leading-7 text-slate-600">{post.excerpt}</p>

              <Link
                href="#"
                className="mt-6 inline-flex items-center text-sm font-semibold text-indigo-600 transition hover:text-indigo-500"
              >
                Read article
              </Link>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
