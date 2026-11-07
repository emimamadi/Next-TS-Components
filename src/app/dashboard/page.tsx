import Link from "next/link";
import { redirect } from "next/navigation";

import { logoutAction } from "@/app/actions/auth";
import { getSession } from "@/lib/auth";

export default async function DashboardPage() {
  const user = await getSession();

  if (!user) {
    redirect("/login?redirect=/dashboard");
  }

  return (
    <main className="min-h-screen bg-slate-100 px-6 py-12 text-slate-900">
      <div className="mx-auto max-w-4xl rounded-2xl bg-white p-8 shadow-lg">
        <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-6">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-indigo-600">
              Dashboard
            </p>
            <h1 className="mt-2 text-3xl font-bold">Welcome, {user?.name}</h1>
          </div>
          <form action={logoutAction}>
            <button
              className="rounded-lg border border-slate-300 bg-slate-100 px-4 py-2 font-medium text-slate-700 transition hover:bg-slate-200"
              type="submit"
            >
              Log out
            </button>
          </form>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl bg-indigo-50 p-5">
            <p className="text-sm uppercase tracking-[0.2em] text-indigo-700">Profile</p>
            <p className="mt-3 text-lg font-semibold">{user?.name}</p>
            <p className="text-slate-600">{user?.email}</p>
            <p className="mt-2 text-sm capitalize text-slate-700">Role: {user?.role}</p>
          </div>

          <div className="rounded-2xl bg-emerald-50 p-5">
            <p className="text-sm uppercase tracking-[0.2em] text-emerald-700">Access</p>
            <p className="mt-3 text-lg font-semibold">Authenticated</p>
            <p className="text-slate-600">You can access protected routes with your current session.</p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            className="rounded-xl bg-indigo-600 px-4 py-2.5 font-medium text-white transition hover:bg-indigo-500"
            href="/"
          >
            Home
          </Link>
          {user?.role === "admin" ? (
            <Link
              className="rounded-xl border border-indigo-200 bg-indigo-50 px-4 py-2.5 font-medium text-indigo-700 transition hover:bg-indigo-100"
              href="/admin"
            >
              Admin panel
            </Link>
          ) : null}
        </div>
      </div>
    </main>
  );
}
