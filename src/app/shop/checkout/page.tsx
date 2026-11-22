"use client";

import Link from "next/link";
import { useState } from "react";
import { updateCartItems, useCartItems } from "@/lib/cart";

export default function ShopCheckoutPage() {
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
      <main className="shop-shell shop-grid min-h-screen px-5 py-10 text-slate-900">
        <div className="mx-auto max-w-xl rounded-[32px] border border-slate-900/10 bg-white p-10 text-center shadow-xl">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-slate-400">Order confirmed</p>
          <h1 className="mt-4 font-serif text-5xl">Thank you</h1>
          <p className="mt-3 text-slate-500">This is a demo checkout. No payment was processed.</p>
          <Link href="/shop" className="mt-7 inline-flex h-12 items-center rounded-full bg-slate-900 px-6 font-bold text-white">Keep shopping</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="shop-shell shop-grid min-h-screen px-5 py-6 text-slate-900 sm:px-8">
      <div className="mx-auto max-w-[1200px]">
        <header className="mb-8 flex items-center justify-between border-b border-slate-900/10 pb-5">
          <Link href="/shop" className="font-serif text-2xl">New Goods</Link>
          <Link href="/shop/cart" className="rounded-full border border-slate-900/10 bg-white/80 px-5 py-2.5 text-sm font-bold">Back to cart</Link>
        </header>

        <p className="text-xs font-black uppercase tracking-[0.22em] text-slate-400">Final step</p>
        <h1 className="mt-2 font-serif text-5xl">Checkout</h1>

        {!items.length ? (
          <div className="mt-8 rounded-[26px] border border-dashed border-slate-900/20 bg-white px-6 py-16 text-center">
            <h2 className="font-serif text-3xl">Your cart is empty</h2>
            <p className="mt-2 text-slate-500">Add products before checking out.</p>
            <Link href="/shop" className="mt-6 inline-flex h-12 items-center rounded-full bg-slate-900 px-6 font-bold text-white">Browse products</Link>
          </div>
        ) : (
          <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_390px]">
            <form onSubmit={handleSubmit} className="rounded-[26px] border border-slate-900/10 bg-white p-6 sm:p-8">
              <p className="mb-6 text-sm text-slate-500">Demo checkout only. No payment information is collected or processed.</p>
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="flex flex-col gap-2 text-sm font-bold">Full name
                  <input required autoComplete="name" type="text" className="h-12 rounded-xl border border-slate-900/10 px-4 outline-none focus:border-slate-700" />
                </label>
                <label className="flex flex-col gap-2 text-sm font-bold">Email
                  <input required autoComplete="email" type="email" className="h-12 rounded-xl border border-slate-900/10 px-4 outline-none focus:border-slate-700" />
                </label>
                <label className="flex flex-col gap-2 text-sm font-bold sm:col-span-2">Shipping address
                  <input required autoComplete="street-address" type="text" className="h-12 rounded-xl border border-slate-900/10 px-4 outline-none focus:border-slate-700" />
                </label>
                <label className="flex flex-col gap-2 text-sm font-bold">City
                  <input required autoComplete="address-level2" type="text" className="h-12 rounded-xl border border-slate-900/10 px-4 outline-none focus:border-slate-700" />
                </label>
                <label className="flex flex-col gap-2 text-sm font-bold">ZIP or postal code
                  <input required autoComplete="postal-code" type="text" className="h-12 rounded-xl border border-slate-900/10 px-4 outline-none focus:border-slate-700" />
                </label>
              </div>
              <button type="submit" className="mt-7 h-12 w-full rounded-full bg-slate-900 text-sm font-bold text-white">Place demo order</button>
            </form>

            <aside className="h-fit rounded-[26px] bg-slate-900 p-6 text-white">
              <h2 className="font-serif text-2xl">Order summary</h2>
              <div className="mt-5 space-y-3">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between gap-3 rounded-2xl bg-white/10 p-3">
                    <div className="flex items-center gap-3">
                      <div className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${item.color}`}><span>{item.icon}</span></div>
                      <div>
                        <p className="text-sm font-bold">{item.name}</p>
                        <p className="text-xs text-slate-300">Qty {item.quantity}</p>
                      </div>
                    </div>
                    <span className="text-sm font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 space-y-3 border-t border-white/15 pt-5 text-sm text-slate-300">
                <div className="flex justify-between"><span>Subtotal</span><span className="font-bold text-white">${subtotal.toFixed(2)}</span></div>
                <div className="flex justify-between"><span>Shipping</span><span className="font-bold text-white">${shipping.toFixed(2)}</span></div>
                <div className="flex justify-between border-t border-white/15 pt-4 text-lg font-bold text-white"><span>Total</span><span>${(subtotal + shipping).toFixed(2)}</span></div>
              </div>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}
