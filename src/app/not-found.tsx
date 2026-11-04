import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-slate-950 px-6 text-center text-white">
      <h1 className="text-5xl font-bold">404</h1>
      <h2 className="text-2xl font-semibold">Page not found</h2>
      <p className="max-w-md text-slate-300">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="rounded-full bg-sky-500 px-5 py-2 font-medium text-white transition hover:bg-sky-400"
      >
        Go home
      </Link>
    </div>
  );
}
