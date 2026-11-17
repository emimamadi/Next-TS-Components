import { fireEvent, render, screen, within } from "@testing-library/react";
import { beforeEach } from "@jest/globals";

import ProductsPage from "@/app/products/page";

describe("Products page", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("filters by category and maximum price, then sorts the matching products", () => {
    render(<ProductsPage />);

    fireEvent.change(screen.getByRole("combobox", { name: "Category" }), {
      target: { value: "Electronics" },
    });
    fireEvent.change(screen.getByRole("spinbutton", { name: "Maximum price ($)" }), {
      target: { value: "60" },
    });
    fireEvent.change(screen.getByRole("combobox", { name: "Sort by" }), {
      target: { value: "price-asc" },
    });

    expect(screen.getByText("Showing 2 of 2 products")).toBeInTheDocument();

    const productCards = screen.getByRole("region", { name: "Products" }).querySelectorAll("article");
    expect(within(productCards[0]).getByRole("heading", { name: "Wireless Charging Pad" })).toBeInTheDocument();
    expect(within(productCards[1]).getByRole("heading", { name: "Pocket Bluetooth Speaker" })).toBeInTheDocument();
  });

  it("limits the number of displayed products", () => {
    render(<ProductsPage />);

    fireEvent.change(screen.getByRole("combobox", { name: "Show" }), {
      target: { value: "4" },
    });

    expect(screen.getByText("Showing 4 of 12 products")).toBeInTheDocument();
    expect(screen.getByRole("region", { name: "Products" }).querySelectorAll("article")).toHaveLength(4);
  });

  it("adds a product to the cart and updates the cart count", () => {
    render(<ProductsPage />);

    fireEvent.click(screen.getAllByRole("button", { name: "Add to cart" })[0]);

    expect(screen.getByRole("link", { name: /cart\s*1/i })).toBeInTheDocument();
    expect(JSON.parse(localStorage.getItem("the-everyday-edit-cart") ?? "[]")).toHaveLength(1);
  });
});
