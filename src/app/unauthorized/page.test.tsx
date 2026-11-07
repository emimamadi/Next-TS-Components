import { render, screen } from "@testing-library/react";

import UnauthorizedPage from "@/app/unauthorized/page";

describe("Unauthorized page", () => {
  it("renders an access denied message", () => {
    render(<UnauthorizedPage />);

    expect(screen.getByText("Access denied")).toBeInTheDocument();
    expect(screen.getByText("You are not allowed here")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Sign in" })).toHaveAttribute("href", "/login");
  });
});
