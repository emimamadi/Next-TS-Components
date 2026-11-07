import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-lg rounded-2xl bg-white p-8 text-center shadow-lg">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-amber-600">Access denied</p>
        <h1 className="mt-3 text-3xl font-bold text-slate-900">You are not allowed here</h1>
        <p className="mt-4 text-slate-600">
          This page requires an elevated role. Sign in with an admin account to continue.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link
            className="rounded-xl bg-indigo-600 px-4 py-2.5 font-medium text-white transition hover:bg-indigo-500"
            href="/login"
          >
            Sign in
          </Link>
          <Link className="rounded-xl border border-slate-300 px-4 py-2.5 font-medium" href="/">
            Home
          </Link>
        </div>
      </div>
    </main>
  );
}
