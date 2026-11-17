import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "@jest/globals";

import CheckoutPage from "@/app/products/checkout/page";

const cartItem = {
  id: 1,
  name: "Everyday Backpack",
  category: "Accessories",
  price: 64,
  rating: 4.8,
  description: "A lightweight carry-all with room for your daily essentials.",
  icon: "🎒",
  color: "from-amber-100 to-orange-50",
  quantity: 2,
};

describe("Checkout page", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("shows a cart summary and clears the cart after a demo order", () => {
    localStorage.setItem("the-everyday-edit-cart", JSON.stringify([cartItem]));

    render(<CheckoutPage />);

    expect(screen.getByRole("heading", { name: "Checkout" })).toBeInTheDocument();
    expect(screen.getAllByText("$128.00")).toHaveLength(2);

    const form = screen.getByRole("button", { name: "Place demo order" }).closest("form");
    if (!form) {
      throw new Error("Checkout form was not rendered.");
    }
    fireEvent.submit(form);

    expect(screen.getByRole("heading", { name: "Thanks for shopping" })).toBeInTheDocument();
    expect(JSON.parse(localStorage.getItem("the-everyday-edit-cart") ?? "[]")).toEqual([]);
  });

  it("prevents checkout when the cart is empty", () => {
    render(<CheckoutPage />);

    expect(screen.getByRole("heading", { name: "Your cart is empty" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Place demo order" })).not.toBeInTheDocument();
  });
});
