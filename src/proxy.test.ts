/** @jest-environment node */

import * as auth from "@/lib/auth";
import { proxy } from "@/proxy";
import type { NextRequest } from "next/server";

jest.mock("@/lib/auth", () => ({
  parseSessionCookie: jest.fn(),
}));

describe("proxy", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("redirects unauthenticated users away from protected routes", async () => {
    (auth.parseSessionCookie as jest.Mock).mockResolvedValue(null);

    const request = {
      nextUrl: { pathname: "/dashboard" },
      cookies: { get: jest.fn(() => undefined) },
      url: "http://localhost/dashboard",
    } as unknown as NextRequest;

    const response = await proxy(request);

    expect(response.status).toBe(307);
    expect(decodeURIComponent(response.headers.get("location") ?? "")).toContain("/login?redirect=/dashboard");
  });

});
