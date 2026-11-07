"use client";

import { useActionState } from "react";

import { loginAction, type LoginState } from "@/app/actions/auth";

const initialState: LoginState = {};

export function LoginForm({ redirectTo }: { redirectTo: string }) {
  const [state, formAction, pending] = useActionState(loginAction, initialState);

  return (
    <form action={formAction} className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-lg">
      <div className="mb-6 text-center">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-indigo-600">
          Welcome back
        </p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">Sign in</h1>
      </div>

      <input type="hidden" name="redirect" value={redirectTo} />

      {state.errors?.message ? (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {state.errors.message[0]}
        </div>
      ) : null}

      <div className="space-y-5">
        <label className="block text-sm font-medium text-slate-700">
          Email
          <input
            autoComplete="email"
            className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2.5 text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            name="email"
            placeholder="admin@demo.com"
            type="email"
          />
          {state.errors?.email ? (
            <span className="mt-1 block text-xs text-red-600">{state.errors.email[0]}</span>
          ) : null}
        </label>

        <label className="block text-sm font-medium text-slate-700">
          Password
          <input
            autoComplete="current-password"
            className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2.5 text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            name="password"
            placeholder="••••••••"
            type="password"
          />
          {state.errors?.password ? (
            <span className="mt-1 block text-xs text-red-600">{state.errors.password[0]}</span>
          ) : null}
        </label>
      </div>

      <button
        className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-indigo-600 px-4 py-3 font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
        disabled={pending}
        type="submit"
      >
        {pending ? "Signing in..." : "Sign in"}
      </button>

      <div className="mt-6 rounded-xl bg-slate-50 p-3 text-sm text-slate-600">
        <p className="font-semibold text-slate-800">Demo credentials</p>
        <ul className="mt-2 space-y-1">
          <li>Admin: admin@demo.com / admin123</li>
          <li>User: user@demo.com / user123</li>
        </ul>
      </div>
    </form>
  );
}
