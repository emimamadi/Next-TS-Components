import Link from "next/link";

import { getSession } from "@/lib/auth";

export default async function Home() {
  const user = await getSession();

  return (
    <main className="min-h-screen bg-slate-100 px-6 py-16 text-slate-900">
      <div className="mx-auto max-w-5xl rounded-3xl bg-white p-8 shadow-xl">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.25em] text-indigo-600">
              Auth demo
            </p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
              Secure access with roles
            </h1>
          </div>
          <div className="flex flex-wrap gap-3">
            {user ? (
              <>
                <Link
                  className="rounded-xl bg-indigo-600 px-4 py-2.5 font-medium text-white transition hover:bg-indigo-500"
                  href="/dashboard"
                >
                  Dashboard
                </Link>
                {user.role === "admin" ? (
                  <Link
                    className="rounded-xl border border-indigo-200 bg-indigo-50 px-4 py-2.5 font-medium text-indigo-700 transition hover:bg-indigo-100"
                    href="/admin"
                  >
                    Admin panel
                  </Link>
                ) : null}
              </>
            ) : (
              <Link
                className="rounded-xl bg-indigo-600 px-4 py-2.5 font-medium text-white transition hover:bg-indigo-500"
                href="/login"
              >
                Sign in
              </Link>
            )}
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl bg-slate-50 p-5">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-600">Status</p>
            <p className="mt-3 text-2xl font-semibold">{user ? "Logged in" : "Guest"}</p>
            <p className="mt-2 text-slate-600">
              {user ? `Signed in as ${user.name}` : "Create a session to unlock protected pages."}
            </p>
          </div>

          <div className="rounded-2xl bg-emerald-50 p-5">
            <p className="text-sm uppercase tracking-[0.2em] text-emerald-700">User access</p>
            <p className="mt-3 text-2xl font-semibold">Standard</p>
            <p className="mt-2 text-slate-600">Users can access the dashboard and personal content.</p>
          </div>

          <div className="rounded-2xl bg-rose-50 p-5">
            <p className="text-sm uppercase tracking-[0.2em] text-rose-700">Admin access</p>
            <p className="mt-3 text-2xl font-semibold">Restricted</p>
            <p className="mt-2 text-slate-600">Only admin-role sessions can reach the admin area.</p>
          </div>
        </div>

        <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6">
          <h2 className="text-xl font-semibold">Demo credentials</h2>
          <ul className="mt-4 space-y-2 text-slate-600">
            <li>Admin: admin@demo.com / admin123</li>
            <li>User: user@demo.com / user123</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
