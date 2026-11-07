import { render, screen } from "@testing-library/react";

import AdminPage from "@/app/admin/page";
import * as auth from "@/lib/auth";

jest.mock("@/lib/auth", () => ({
  getSession: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  redirect: jest.fn((url: string) => {
    throw new Error(`REDIRECT:${url}`);
  }),
}));

describe("Admin page", () => {
  it("renders admin content for privileged users", async () => {
    (auth.getSession as jest.Mock).mockResolvedValue({
      id: "user-admin",
      name: "Admin User",
      email: "admin@demo.com",
      role: "admin",
    });

    render(await AdminPage());

    expect(screen.getByText("Admin panel")).toBeInTheDocument();
    expect(screen.getByText("Restricted Area")).toBeInTheDocument();
    expect(screen.getByText("Admin User")).toBeInTheDocument();
  });
});
