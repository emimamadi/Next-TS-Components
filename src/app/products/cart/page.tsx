"use client";

import Link from "next/link";
import { updateCartItems, useCartItems } from "@/lib/cart";

export default function CartPage() {
  const items = useCartItems();
  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
  const shipping = subtotal > 0 ? 12 : 0;

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900 sm:px-6 sm:py-12">
        <div className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-600">Your cart</p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight">Cart is empty</h1>
          <p className="mt-3 text-slate-600">Add a few essentials from the products page to get started.</p>
          <Link
            href="/products"
            className="mt-6 inline-flex rounded-xl bg-indigo-600 px-5 py-3 font-medium text-white transition hover:bg-indigo-500"
          >
            Continue shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-600">Your cart</p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight">Review your items</h1>
          </div>
          <Link
            href="/products"
            className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 font-medium text-slate-700 shadow-sm transition hover:bg-slate-100"
          >
            Continue shopping
          </Link>
        </header>

        <div className="grid gap-6 lg:grid-cols-[1.6fr_0.8fr]">
          <section aria-label="Cart items" className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            {items.map((item) => (
              <article key={item.id} className="flex flex-col gap-5 rounded-2xl border border-slate-200 p-4 sm:flex-row sm:items-center">
                <div className={`flex h-20 w-20 items-center justify-center rounded-2xl bg-linear-to-br ${item.color}`}>
                  <span className="text-4xl">{item.icon}</span>
                </div>

                <div className="flex flex-1 flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-600">{item.category}</p>
                    <h2 className="mt-1 text-lg font-semibold">{item.name}</h2>
                    <p className="text-sm text-slate-600">${item.price.toFixed(2)} each</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-2 text-sm text-slate-600">
                      Quantity
                      <select
                        aria-label={`Quantity for ${item.name}`}
                        className="rounded-lg border border-slate-300 bg-white px-2 py-1.5 text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                        value={item.quantity}
                        onChange={(event) => {
                          const quantity = Number(event.target.value);
                          updateCartItems((currentItems) =>
                            currentItems.map((currentItem) =>
                              currentItem.id === item.id ? { ...currentItem, quantity } : currentItem,
                            ),
                          );
                        }}
                      >
                        {[1, 2, 3, 4, 5].map((quantity) => (
                          <option key={quantity} value={quantity}>{quantity}</option>
                        ))}
                      </select>
                    </label>

                    <button
                      type="button"
                      onClick={() =>
                        updateCartItems((currentItems) => currentItems.filter((currentItem) => currentItem.id !== item.id))
                      }
                      className="text-sm font-medium text-rose-600 hover:text-rose-500"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </section>

          <aside className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold">Order summary</h2>
            <div className="mt-5 space-y-3 text-sm text-slate-600">
              <div className="flex items-center justify-between">
                <span>Subtotal</span>
                <span className="font-medium text-slate-900">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Shipping</span>
                <span className="font-medium text-slate-900">${shipping.toFixed(2)}</span>
              </div>
            </div>
            <div className="mt-5 border-t border-slate-200 pt-4">
              <div className="flex items-center justify-between text-base font-semibold">
                <span>Total</span>
                <span>${(subtotal + shipping).toFixed(2)}</span>
              </div>
            </div>
            <Link
              href="/products/checkout"
              className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-indigo-600 px-4 py-3 font-medium text-white transition hover:bg-indigo-500"
            >
              Proceed to checkout
            </Link>
          </aside>
        </div>
      </div>
    </main>
  );
}
