import { render, screen } from "@testing-library/react";

import LoginPage from "@/app/login/page";

describe("Login page", () => {
  it("renders the login form with redirect target from params", async () => {
    render(await LoginPage({ searchParams: Promise.resolve({ redirect: "/dashboard" }) }));

    expect(screen.getByRole("heading", { name: "Sign in" })).toBeInTheDocument();
    const hiddenInput = document.querySelector('input[name="redirect"]') as HTMLInputElement;

    expect(hiddenInput).toHaveValue("/dashboard");
  });
});
