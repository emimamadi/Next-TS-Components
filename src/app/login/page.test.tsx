import { render, screen } from "@testing-library/react";

import LoginPage from "@/app/login/page";

describe("Login page", () => {
  it("renders the login form with redirect target from params", () => {
    render(<LoginPage searchParams={{ redirect: "/admin" }} />);

    expect(screen.getByRole("heading", { name: "Sign in" })).toBeInTheDocument();
    const hiddenInput = document.querySelector('input[name="redirect"]') as HTMLInputElement;

    expect(hiddenInput).toHaveValue("/admin");
  });
});
