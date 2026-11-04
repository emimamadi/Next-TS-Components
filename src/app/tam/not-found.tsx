import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-green-50 px-6 text-center text-slate-800">
      <h1 className="text-4xl font-bold">Tam page not found</h1>
      <p className="text-lg text-slate-600">The requested tam route could not be located.</p>
      <Link
        href="/tam"
        className="rounded-lg bg-green-600 px-4 py-2 font-medium text-white transition hover:bg-green-500"
      >
        Back to tam
      </Link>
    </div>
  );
}
