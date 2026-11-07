import { render, screen } from "@testing-library/react";

import { LoginForm } from "@/components/login-form";

describe("LoginForm", () => {
  it("renders sign-in form fields and demo credentials", () => {
    render(<LoginForm redirectTo="/dashboard" />);

    expect(screen.getByRole("heading", { name: "Sign in" })).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByText("Admin: admin@demo.com / admin123")).toBeInTheDocument();
    expect(screen.getByText("User: user@demo.com / user123")).toBeInTheDocument();
    expect(screen.getByDisplayValue("/dashboard")).toHaveAttribute("type", "hidden");
  });
});
