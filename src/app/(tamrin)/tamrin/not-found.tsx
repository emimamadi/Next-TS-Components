import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-sky-50 px-6 text-center text-slate-800">
      <h1 className="text-4xl font-bold">Tamrin page not found</h1>
      <p className="text-lg text-slate-600">This practice page does not exist.</p>
      <Link
        href="/tamrin"
        className="rounded-lg bg-sky-600 px-4 py-2 font-medium text-white transition hover:bg-sky-500"
      >
        Back to tamrin
      </Link>
    </div>
  );
}
