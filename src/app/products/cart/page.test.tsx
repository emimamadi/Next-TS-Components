import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "@jest/globals";

import CartPage from "@/app/products/cart/page";

const cartItem = {
  id: 1,
  name: "Everyday Backpack",
  category: "Accessories",
  price: 64,
  rating: 4.8,
  description: "A lightweight carry-all with room for your daily essentials.",
  icon: "🎒",
  color: "from-amber-100 to-orange-50",
  quantity: 1,
};

describe("Cart page", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("renders cart items and updates quantity and subtotal", () => {
    localStorage.setItem("the-everyday-edit-cart", JSON.stringify([cartItem]));

    render(<CartPage />);

    expect(screen.getByRole("heading", { name: "Everyday Backpack" })).toBeInTheDocument();
    expect(screen.getByText("$64.00")).toBeInTheDocument();

    fireEvent.change(screen.getByRole("combobox", { name: "Quantity for Everyday Backpack" }), {
      target: { value: "2" },
    });

    expect(screen.getByText("$128.00")).toBeInTheDocument();
    expect(JSON.parse(localStorage.getItem("the-everyday-edit-cart") ?? "[]")[0].quantity).toBe(2);
  });

  it("shows a useful empty-cart state", () => {
    render(<CartPage />);

    expect(screen.getByRole("heading", { name: "Cart is empty" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Continue shopping" })).toHaveAttribute("href", "/products");
  });
});
