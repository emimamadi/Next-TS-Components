import {
  authenticateUser,
  createSessionCookieValue,
  parseSessionCookie,
} from "@/lib/auth";

describe("auth utility", () => {
  it("authenticates valid admin credentials", () => {
    expect(authenticateUser("admin@demo.com", "admin123")).toMatchObject({
      email: "admin@demo.com",
      role: "admin",
    });
  });

  it("rejects invalid credentials", () => {
    expect(authenticateUser("admin@demo.com", "wrong-password")).toBeNull();
    expect(authenticateUser("unknown@demo.com", "admin123")).toBeNull();
  });

  it("creates and parses a signed session cookie", async () => {
    const user = {
      id: "user-admin",
      name: "Admin User",
      email: "admin@demo.com",
      role: "admin" as const,
    };

    const cookie = await createSessionCookieValue(user);
    const parsed = await parseSessionCookie(cookie);

    expect(cookie).toContain(".");
    expect(parsed).toEqual(user);
  });

  it("rejects tampered session cookies", async () => {
    const user = {
      id: "user-user",
      name: "Regular User",
      email: "user@demo.com",
      role: "user" as const,
    };

    const cookie = await createSessionCookieValue(user);
    const tampered = `invalid.${cookie.split(".")[1]}`;

    await expect(parseSessionCookie(tampered)).resolves.toBeNull();
  });
});
