import Link from "next/link";
import { redirect } from "next/navigation";

import { getSession } from "@/lib/auth";

export default async function AdminPage() {
  const user = await getSession();

  if (!user) {
    redirect("/login?redirect=/admin");
  }

  if (user.role !== "admin") {
    redirect("/unauthorized");
  }

  return (
    <main className="min-h-screen bg-slate-100 px-6 py-12 text-slate-900">
      <div className="mx-auto max-w-4xl rounded-2xl bg-white p-8 shadow-lg">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-rose-600">Admin panel</p>
        <h1 className="mt-3 text-3xl font-bold">Restricted Area</h1>
        <p className="mt-4 max-w-2xl text-slate-600">
          This page is only accessible to users with the admin role. The session is verified server-side.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl bg-rose-50 p-5">
            <p className="text-sm uppercase tracking-[0.2em] text-rose-700">User</p>
            <p className="mt-2 text-lg font-semibold">{user.name}</p>
          </div>
          <div className="rounded-2xl bg-slate-100 p-5">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-700">Email</p>
            <p className="mt-2 text-lg font-semibold">{user.email}</p>
          </div>
          <div className="rounded-2xl bg-emerald-50 p-5">
            <p className="text-sm uppercase tracking-[0.2em] text-emerald-700">Permission</p>
            <p className="mt-2 text-lg font-semibold">Allowed</p>
          </div>
        </div>

        <div className="mt-8 flex gap-4">
          <Link
            className="rounded-xl bg-slate-900 px-4 py-2.5 font-medium text-white transition hover:bg-slate-700"
            href="/dashboard"
          >
            Go to dashboard
          </Link>
          <Link className="rounded-xl border border-slate-300 px-4 py-2.5 font-medium" href="/">
            Home
          </Link>
        </div>
      </div>
    </main>
  );
}
