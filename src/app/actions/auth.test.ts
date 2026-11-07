import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { loginAction } from "@/app/actions/auth";
import {
  authenticateUser,
  createSessionCookieValue,
} from "@/lib/auth";

jest.mock("next/headers", () => ({
  cookies: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  redirect: jest.fn((path: string) => {
    throw new Error(`REDIRECT:${path}`);
  }),
}));

jest.mock("@/lib/auth", () => ({
  SESSION_COOKIE_NAME: "session",
  authenticateUser: jest.fn(),
  createSessionCookieValue: jest.fn(),
}));

describe("loginAction", () => {
  const cookieStore = { set: jest.fn() };

  beforeEach(() => {
    jest.clearAllMocks();
    (cookies as jest.Mock).mockResolvedValue(cookieStore);
    (createSessionCookieValue as jest.Mock).mockResolvedValue("signed-session");
  });

  it("reports missing email and password without creating a session", async () => {
    const formData = new FormData();

    await expect(loginAction(undefined, formData)).resolves.toEqual({
      errors: {
        email: ["Email is required."],
        password: ["Password is required."],
      },
    });

    expect(authenticateUser).not.toHaveBeenCalled();
    expect(cookieStore.set).not.toHaveBeenCalled();
  });

  it("reports invalid credentials without creating a session", async () => {
    (authenticateUser as jest.Mock).mockReturnValue(null);
    const formData = new FormData();
    formData.set("email", "unknown@example.com");
    formData.set("password", "incorrect");

    await expect(loginAction(undefined, formData)).resolves.toEqual({
      errors: { message: ["Invalid email or password."] },
    });

    expect(cookieStore.set).not.toHaveBeenCalled();
    expect(redirect).not.toHaveBeenCalled();
  });

  it("sets a session and redirects to the requested internal path", async () => {
    (authenticateUser as jest.Mock).mockReturnValue({
      id: "user-admin",
      name: "Admin User",
      email: "admin@demo.com",
      role: "admin",
    });
    const formData = new FormData();
    formData.set("email", "admin@demo.com");
    formData.set("password", "admin123");
    formData.set("redirect", "/admin?tab=users");

    await expect(loginAction(undefined, formData)).rejects.toThrow("REDIRECT:/admin?tab=users");

    expect(cookieStore.set).toHaveBeenCalledWith(
      "session",
      "signed-session",
      expect.objectContaining({
        httpOnly: true,
        sameSite: "lax",
        path: "/",
      }),
    );
    expect(redirect).toHaveBeenCalledWith("/admin?tab=users");
  });

  it.each(["https://example.com", "//example.com/path", "/\\\\example.com"])(
    "falls back to the dashboard for unsafe redirect target %s",
    async (target) => {
      (authenticateUser as jest.Mock).mockReturnValue({
        id: "user-admin",
        name: "Admin User",
        email: "admin@demo.com",
        role: "admin",
      });
      const formData = new FormData();
      formData.set("email", "admin@demo.com");
      formData.set("password", "admin123");
      formData.set("redirect", target);

      await expect(loginAction(undefined, formData)).rejects.toThrow("REDIRECT:/dashboard");
      expect(redirect).toHaveBeenCalledWith("/dashboard");
    },
  );
});
