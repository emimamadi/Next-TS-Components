/** @jest-environment node */

import * as auth from "@/lib/auth";
import { middleware } from "@/middleware";
import type { NextRequest } from "next/server";

jest.mock("@/lib/auth", () => ({
  parseSessionCookie: jest.fn(),
}));

describe("middleware", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("redirects unauthenticated users away from protected routes", async () => {
    (auth.parseSessionCookie as jest.Mock).mockResolvedValue(null);

    const request = {
      nextUrl: { pathname: "/dashboard" },
      cookies: { get: jest.fn(() => undefined) },
      url: "http://localhost/dashboard",
    } as NextRequest;

    const response = await middleware(request);

    expect(response.status).toBe(307);
    expect(decodeURIComponent(response.headers.get("location") ?? "")).toContain("/login?redirect=/dashboard");
  });

  it("blocks non-admin users from admin routes", async () => {
    (auth.parseSessionCookie as jest.Mock).mockResolvedValue({
      id: "user-normal",
      name: "Regular User",
      email: "user@demo.com",
      role: "user",
    });

    const request = {
      nextUrl: { pathname: "/admin" },
      cookies: { get: jest.fn(() => ({ value: "cookie-value" })) },
      url: "http://localhost/admin",
    } as NextRequest;

    const response = await middleware(request);

    expect(response.status).toBe(307);
    expect(response.headers.get("location")).toContain("/unauthorized");
  });

  it("allows admin users to access admin routes", async () => {
    (auth.parseSessionCookie as jest.Mock).mockResolvedValue({
      id: "user-admin",
      name: "Admin User",
      email: "admin@demo.com",
      role: "admin",
    });

    const request = {
      nextUrl: { pathname: "/admin" },
      cookies: { get: jest.fn(() => ({ value: "cookie-value" })) },
      url: "http://localhost/admin",
    } as NextRequest;

    const response = await middleware(request);

    expect(response.status).toBe(200);
  });
});
