"use client";

import Link from "next/link";
import { useState } from "react";
import { updateCartItems, useCartItems } from "@/lib/cart";

export default function CheckoutPage() {
  const items = useCartItems();
  const [submitted, setSubmitted] = useState(false);
  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
  const shipping = subtotal > 0 ? 12 : 0;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateCartItems(() => []);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900 sm:px-6 sm:py-12">
        <div className="mx-auto max-w-xl rounded-3xl border border-emerald-200 bg-emerald-50 p-8 text-center shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-700">Order placed</p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight">Thanks for shopping</h1>
          <p className="mt-3 text-emerald-900">This is a demo checkout; no payment was processed.</p>
          <Link
            href="/products"
            className="mt-6 inline-flex rounded-xl bg-emerald-600 px-5 py-3 font-medium text-white transition hover:bg-emerald-500"
          >
            Keep shopping
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
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-600">Final step</p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight">Checkout</h1>
          </div>
          <Link
            href="/products/cart"
            className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 font-medium text-slate-700 shadow-sm transition hover:bg-slate-100"
          >
            Back to cart
          </Link>
        </header>

        {items.length === 0 ? (
          <div className="mx-auto max-w-2xl rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center">
            <h2 className="text-xl font-semibold">Your cart is empty</h2>
            <p className="mt-2 text-slate-600">Add products before checking out.</p>
            <Link
              href="/products"
              className="mt-5 inline-flex rounded-xl bg-indigo-600 px-5 py-3 font-medium text-white transition hover:bg-indigo-500"
            >
              Browse products
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <form onSubmit={handleSubmit} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="mb-5 text-sm text-slate-600">Demo checkout only. No payment information is collected or processed.</p>
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
                  Full name
                  <input required autoComplete="name" className="rounded-lg border border-slate-300 px-3 py-2.5 text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200" type="text" />
                </label>
                <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
                  Email
                  <input required autoComplete="email" className="rounded-lg border border-slate-300 px-3 py-2.5 text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200" type="email" />
                </label>
                <label className="flex flex-col gap-2 text-sm font-medium text-slate-700 sm:col-span-2">
                  Shipping address
                  <input required autoComplete="street-address" className="rounded-lg border border-slate-300 px-3 py-2.5 text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200" type="text" />
                </label>
                <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
                  City
                  <input required autoComplete="address-level2" className="rounded-lg border border-slate-300 px-3 py-2.5 text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200" type="text" />
                </label>
                <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
                  ZIP or postal code
                  <input required autoComplete="postal-code" className="rounded-lg border border-slate-300 px-3 py-2.5 text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200" type="text" />
                </label>
              </div>
              <button
                type="submit"
                className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-indigo-600 px-4 py-3 font-medium text-white transition hover:bg-indigo-500"
              >
                Place demo order
              </button>
            </form>

            <aside className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold">Order summary</h2>
              <div className="mt-5 space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between gap-3 rounded-2xl bg-slate-50 p-3">
                    <div className="flex items-center gap-3">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br ${item.color}`}>
                        <span>{item.icon}</span>
                      </div>
                      <div>
                        <p className="font-medium text-slate-900">{item.name}</p>
                        <p className="text-xs text-slate-600">Qty {item.quantity}</p>
                      </div>
                    </div>
                    <span className="font-medium text-slate-900">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 space-y-3 text-sm text-slate-600">
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
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}
