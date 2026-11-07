import { render, screen } from "@testing-library/react";

import DashboardPage from "@/app/dashboard/page";
import * as auth from "@/lib/auth";

jest.mock("@/lib/auth", () => ({
  getSession: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  redirect: jest.fn((url: string) => {
    throw new Error(`REDIRECT:${url}`);
  }),
}));

describe("Dashboard page", () => {
  it("renders the user dashboard when a valid session exists", async () => {
    (auth.getSession as jest.Mock).mockResolvedValue({
      id: "user-admin",
      name: "Admin User",
      email: "admin@demo.com",
      role: "admin",
    });

    render(await DashboardPage());

    expect(screen.getByText("Welcome, Admin User")).toBeInTheDocument();
    expect(screen.getByText("Role: admin")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Log out" })).toBeInTheDocument();
  });
});
