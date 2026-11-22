"use client";

import Link from "next/link";
import { updateCartItems, useCartItems } from "@/lib/cart";

export default function ShopCartPage() {
  const items = useCartItems();
  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
  const shipping = subtotal > 0 ? 12 : 0;

  if (!items.length) {
    return (
      <main className="shop-shell shop-grid min-h-screen px-5 py-10 text-slate-900">
        <div className="mx-auto max-w-2xl rounded-[32px] border border-slate-900/10 bg-white p-10 text-center shadow-xl">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-slate-400">Shopping bag</p>
          <h1 className="mt-4 font-serif text-5xl">Your cart is empty</h1>
          <p className="mt-3 text-slate-500">Explore the collection and find something useful.</p>
          <Link href="/shop" className="mt-7 inline-flex h-12 items-center rounded-full bg-slate-900 px-6 font-bold text-white">Continue shopping</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="shop-shell shop-grid min-h-screen px-5 py-6 text-slate-900 sm:px-8">
      <div className="mx-auto max-w-[1200px]">
        <header className="mb-8 flex items-center justify-between border-b border-slate-900/10 pb-5">
          <Link href="/shop" className="font-serif text-2xl">New Goods</Link>
          <Link href="/shop" className="rounded-full border border-slate-900/10 bg-white/80 px-5 py-2.5 text-sm font-bold">Continue shopping</Link>
        </header>

        <p className="text-xs font-black uppercase tracking-[0.22em] text-slate-400">Shopping bag</p>
        <h1 className="mt-2 font-serif text-5xl">Your cart</h1>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_350px]">
          <section aria-label="Cart items" className="space-y-4">
            {items.map((item) => (
              <article key={item.id} className="flex gap-4 rounded-[24px] border border-slate-900/10 bg-white p-4">
                <div className={`flex h-24 w-24 shrink-0 items-center justify-center rounded-[18px] bg-gradient-to-br ${item.color}`}>
                  <span className="shop-product text-5xl">{item.icon}</span>
                </div>
                <div className="flex flex-1 flex-col justify-between py-1 sm:flex-row sm:items-center">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">{item.category}</p>
                    <h2 className="mt-1 font-serif text-xl">{item.name}</h2>
                    <p className="mt-1 text-sm text-slate-500">${item.price.toFixed(2)} each</p>
                  </div>
                  <div className="mt-4 flex items-center gap-3 sm:mt-0">
                    <label className="flex items-center gap-2 text-sm text-slate-500">
                      Quantity
                      <select
                        aria-label={`Quantity for ${item.name}`}
                        value={item.quantity}
                        onChange={(event) => {
                          const quantity = Number(event.target.value);
                          updateCartItems((current) =>
                            current.map((currentItem) =>
                              currentItem.id === item.id ? { ...currentItem, quantity } : currentItem,
                            ),
                          );
                        }}
                        className="h-10 rounded-full border border-slate-900/10 bg-white px-3 text-slate-900"
                      >
                        {[1, 2, 3, 4, 5].map((quantity) => <option key={quantity} value={quantity}>{quantity}</option>)}
                      </select>
                    </label>
                    <button
                      type="button"
                      onClick={() => updateCartItems((current) => current.filter((currentItem) => currentItem.id !== item.id))}
                      className="text-sm font-bold text-rose-700"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </section>

          <aside className="h-fit rounded-[26px] bg-slate-900 p-6 text-white">
            <h2 className="font-serif text-2xl">Order summary</h2>
            <div className="mt-6 space-y-4 text-sm text-slate-300">
              <div className="flex justify-between"><span>Subtotal</span><span className="font-bold text-white">${subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between"><span>Shipping</span><span className="font-bold text-white">${shipping.toFixed(2)}</span></div>
            </div>
            <div className="mt-6 flex justify-between border-t border-white/15 pt-5 text-lg font-bold">
              <span>Total</span><span>${(subtotal + shipping).toFixed(2)}</span>
            </div>
            <Link href="/shop/checkout" className="mt-6 flex h-12 items-center justify-center rounded-full bg-amber-300 text-sm font-bold text-slate-900">Proceed to checkout</Link>
          </aside>
        </div>
      </div>
    </main>
  );
}
