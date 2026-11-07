import { cookies } from "next/headers";

export type UserRole = "admin" | "user";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
};

export const SESSION_COOKIE_NAME = "session";
export const AUTH_SECRET = process.env.AUTH_SECRET ?? "demo-secret-change-me";

const users: AuthUser[] = [
  {
    id: "user-admin",
    name: "Admin User",
    email: "admin@demo.com",
    role: "admin",
  },
  {
    id: "user-normal",
    name: "Regular User",
    email: "user@demo.com",
    role: "user",
  },
];

const passwordMap: Record<string, string> = {
  "admin@demo.com": "admin123",
  "user@demo.com": "user123",
};

function encodeBase64Url(value: string): string {
  const bytes = new TextEncoder().encode(value);
  let binary = "";

  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });

  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function decodeBase64Url(value: string): string {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padding = normalized.length % 4 === 0 ? "" : "=".repeat(4 - (normalized.length % 4));
  const binary = atob(normalized + padding);
  const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0));

  return new TextDecoder().decode(bytes);
}

async function createSignature(value: string): Promise<string> {
  const cryptoApi = globalThis.crypto;

  if (!cryptoApi?.subtle) {
    throw new Error("Web Crypto API is not available in this environment.");
  }

  const encoder = new TextEncoder();
  const key = await cryptoApi.subtle.importKey(
    "raw",
    encoder.encode(AUTH_SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );

  const signature = await cryptoApi.subtle.sign("HMAC", key, encoder.encode(value));
  const bytes = new Uint8Array(signature);

  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
}

export function authenticateUser(email: string, password: string): AuthUser | null {
  const normalizedEmail = email.trim().toLowerCase();
  const user = users.find((entry) => entry.email === normalizedEmail);

  if (!user) {
    return null;
  }

  if (passwordMap[normalizedEmail] !== password) {
    return null;
  }

  return user;
}

export async function createSessionCookieValue(user: AuthUser): Promise<string> {
  const payload = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  const encoded = encodeBase64Url(JSON.stringify(payload));
  const signature = await createSignature(encoded);

  return `${encoded}.${signature}`;
}

export async function parseSessionCookie(value: string | undefined): Promise<AuthUser | null> {
  if (!value) {
    return null;
  }

  const [encoded, signature] = value.split(".");

  if (!encoded || !signature) {
    return null;
  }

  const expectedSignature = await createSignature(encoded);

  if (signature !== expectedSignature) {
    return null;
  }

  try {
    const parsed = JSON.parse(decodeBase64Url(encoded)) as Partial<AuthUser>;

    if (!parsed.id || !parsed.email || !parsed.role || !parsed.name) {
      return null;
    }

    return {
      id: parsed.id,
      name: parsed.name,
      email: parsed.email,
      role: parsed.role as UserRole,
    };
  } catch {
    return null;
  }
}

export async function getSession(): Promise<AuthUser | null> {
  const cookieStore = await cookies();
  const value = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  return parseSessionCookie(value);
}

export function roleMatches(user: AuthUser | null, role: UserRole): boolean {
  return user?.role === role;
}
