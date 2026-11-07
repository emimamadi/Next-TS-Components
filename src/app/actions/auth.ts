"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import {
  SESSION_COOKIE_NAME,
  authenticateUser,
  createSessionCookieValue,
} from "@/lib/auth";

export type LoginState = {
  errors?: {
    email?: string[];
    password?: string[];
    message?: string[];
  };
  message?: string;
};

function getSafeRedirectPath(value: FormDataEntryValue | null): string {
  const fallback = "/dashboard";

  if (typeof value !== "string" || !value.startsWith("/")) {
    return fallback;
  }

  const destination = new URL(value, "http://localhost");

  if (destination.origin !== "http://localhost") {
    return fallback;
  }

  return `${destination.pathname}${destination.search}${destination.hash}`;
}

export async function loginAction(
  prevState: LoginState | undefined,
  formData: FormData,
): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");

  const errors: LoginState["errors"] = {};

  if (!email) {
    errors.email = ["Email is required."];
  }

  if (!password) {
    errors.password = ["Password is required."];
  }

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  const user = authenticateUser(email, password);

  if (!user) {
    return {
      errors: {
        message: ["Invalid email or password."],
      },
    };
  }

  const cookieStore = await cookies();
  const sessionValue = await createSessionCookieValue(user);

  cookieStore.set(SESSION_COOKIE_NAME, sessionValue, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24,
  });

  redirect(getSafeRedirectPath(formData.get("redirect")));
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);

  redirect("/login");
}
