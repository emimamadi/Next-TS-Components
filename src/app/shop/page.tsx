"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { updateCartItems, useCartItems } from "@/lib/cart";

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  rating: number;
  description: string;
  icon: string;
  color: string;
};

type SortOption = "featured" | "price-low" | "price-high" | "rating";

const products: Product[] = [
  { id: 101, name: "Arc Desk Lamp", category: "Lighting", price: 89, rating: 4.9, description: "A sculptural lamp for focused, warm workspaces.", icon: "💡", color: "from-amber-100 to-yellow-50" },
  { id: 102, name: "Cloud Headphones", category: "Audio", price: 149, rating: 4.8, description: "Immersive sound with soft everyday comfort.", icon: "🎧", color: "from-violet-100 to-fuchsia-50" },
  { id: 103, name: "Transit Backpack", category: "Bags", price: 72, rating: 4.7, description: "A balanced daily bag built for movement.", icon: "🎒", color: "from-orange-100 to-amber-50" },
  { id: 104, name: "Pebble Speaker", category: "Audio", price: 58, rating: 4.5, description: "Compact, clear sound for every room.", icon: "🔊", color: "from-sky-100 to-cyan-50" },
  { id: 105, name: "Studio Sneakers", category: "Wear", price: 96, rating: 4.6, description: "Lightweight sneakers with an easy silhouette.", icon: "👟", color: "from-emerald-100 to-teal-50" },
  { id: 106, name: "Halo Bottle", category: "Lifestyle", price: 38, rating: 4.4, description: "Insulated hydration in a clean steel profile.", icon: "🧴", color: "from-cyan-100 to-blue-50" },
  { id: 107, name: "Form Card Case", category: "Accessories", price: 44, rating: 4.7, description: "A slim leather case for the essentials.", icon: "👝", color: "from-rose-100 to-orange-50" },
  { id: 108, name: "Drift Knit", category: "Wear", price: 52, rating: 4.5, description: "A soft layer for cooler city days.", icon: "🧢", color: "from-lime-100 to-green-50" },
  { id: 109, name: "Pour Set", category: "Kitchen", price: 48, rating: 4.8, description: "Ceramic tools for a slower morning ritual.", icon: "☕", color: "from-pink-100 to-rose-50" },
  { id: 110, name: "Line Cushion", category: "Living", price: 29, rating: 4.3, description: "A tactile accent with a warm woven finish.", icon: "🛋️", color: "from-indigo-100 to-violet-50" },
  { id: 111, name: "Shift Charging Pad", category: "Tech", price: 55, rating: 4.6, description: "A low-profile base for wireless charging.", icon: "🔋", color: "from-fuchsia-100 to-purple-50" },
  { id: 112, name: "Daily Tee", category: "Wear", price: 34, rating: 4.4, description: "An easy cotton staple made for repeat wear.", icon: "👕", color: "from-slate-100 to-gray-50" },
];

const categories = ["All", ...new Set(products.map((product) => product.category))];

export default function ShopPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState<SortOption>("featured");
  const [maxPrice, setMaxPrice] = useState("");
  const [limit, setLimit] = useState(8);
  const cartItems = useCartItems();

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    const priceLimit = maxPrice === "" ? Number.POSITIVE_INFINITY : Number(maxPrice);
    const result = products.filter((product) =>
      (category === "All" || product.category === category) &&
      product.price <= priceLimit &&
      (!term || `${product.name} ${product.category} ${product.description}`.toLowerCase().includes(term)),
    );

    if (sort === "price-low") result.sort((a, b) => a.price - b.price);
    if (sort === "price-high") result.sort((a, b) => b.price - a.price);
    if (sort === "rating") result.sort((a, b) => b.rating - a.rating);
    return result;
  }, [category, maxPrice, search, sort]);

  const visible = filtered.slice(0, limit);
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const addToCart = (product: Product) => {
    updateCartItems((current) => {
      const existing = current.find((item) => item.id === product.id);
      if (existing) {
        return current.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }
      return [...current, { ...product, quantity: 1 }];
    });
  };

  return (
    <main className="shop-shell shop-grid min-h-screen text-slate-900">
      <div className="mx-auto max-w-[1480px] px-4 py-5 sm:px-7 lg:px-10">
        <header className="flex items-center justify-between border-b border-slate-900/10 pb-5">
          <Link href="/shop" className="flex items-center gap-3" aria-label="New goods home">
            <span className="grid h-11 w-11 place-items-center rounded-full border border-slate-900/20 bg-white/70 text-sm font-black">NG</span>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-slate-500">New Goods</p>
              <p className="font-serif text-xl leading-none">Collection 01</p>
            </div>
          </Link>
          <Link
            href="/shop/cart"
            className="flex h-11 items-center gap-2 rounded-full border border-slate-900/10 bg-white/80 px-4 text-sm font-bold shadow-sm"
          >
            Cart
            <span className="grid h-6 min-w-6 place-items-center rounded-full bg-slate-900 px-1 text-xs text-white">{itemCount}</span>
          </Link>
        </header>

        <div className="grid gap-7 py-7 lg:grid-cols-[220px_minmax(0,1fr)]">
          <aside aria-label="Product filters" className="lg:sticky lg:top-6 lg:h-fit">
            <div className="rounded-[26px] border border-slate-900/10 bg-white/75 p-5 shadow-[0_18px_45px_rgba(15,23,42,0.06)] backdrop-blur">
              <div className="flex items-center justify-between">
                <p className="text-xs font-black uppercase tracking-[0.2em]">Filters</p>
                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    setCategory("All");
                    setSort("featured");
                    setMaxPrice("");
                    setLimit(8);
                  }}
                  className="text-xs font-bold text-slate-500 hover:text-slate-900"
                >
                  Reset
                </button>
              </div>

              <label className="mt-5 block">
                <span className="sr-only">Search products</span>
                <input
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search the collection"
                  className="h-11 w-full rounded-full border border-slate-900/10 bg-white px-4 text-sm outline-none focus:border-slate-700"
                />
              </label>

              <label className="mt-5 block text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
                Category
                <select
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                  className="mt-2 h-11 w-full rounded-xl border border-slate-900/10 bg-white px-3 text-sm normal-case text-slate-900 outline-none"
                >
                  {categories.map((option) => <option key={option} value={option}>{option}</option>)}
                </select>
              </label>

              <label className="mt-4 block text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
                Maximum price
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={maxPrice}
                  onChange={(event) => setMaxPrice(event.target.value)}
                  placeholder="No limit"
                  className="mt-2 h-11 w-full rounded-xl border border-slate-900/10 bg-white px-3 text-sm normal-case text-slate-900 outline-none"
                />
              </label>

              <label className="mt-4 block text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
                Sort by
                <select
                  value={sort}
                  onChange={(event) => setSort(event.target.value as SortOption)}
                  className="mt-2 h-11 w-full rounded-xl border border-slate-900/10 bg-white px-3 text-sm normal-case text-slate-900 outline-none"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: low to high</option>
                  <option value="price-high">Price: high to low</option>
                  <option value="rating">Top rated</option>
                </select>
              </label>

              <label className="mt-4 block text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
                Products
                <select
                  value={limit}
                  onChange={(event) => setLimit(Number(event.target.value))}
                  className="mt-2 h-11 w-full rounded-xl border border-slate-900/10 bg-white px-3 text-sm normal-case text-slate-900 outline-none"
                >
                  <option value={4}>4 items</option>
                  <option value={8}>8 items</option>
                  <option value={12}>12 items</option>
                </select>
              </label>
            </div>
          </aside>

          <section>
            <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-500">Edition 2026</p>
                <h1 className="mt-2 font-serif text-5xl leading-none sm:text-6xl">Useful objects.</h1>
              </div>
              <p aria-live="polite" className="rounded-full border border-slate-900/10 bg-white/70 px-4 py-2 text-sm text-slate-500">
                Showing {visible.length} of {filtered.length} products
              </p>
            </div>

            {visible.length ? (
              <section aria-label="Products" className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {visible.map((product, index) => (
                  <article
                    key={product.id}
                    className="shop-card shop-enter overflow-hidden rounded-[26px] border border-slate-900/10 bg-white p-3"
                    style={{ animationDelay: `${index * 55}ms` }}
                  >
                    <div className={`shop-perspective relative flex h-60 items-center justify-center overflow-hidden rounded-[20px] bg-gradient-to-br ${product.color}`}>
                      <div className="absolute left-4 top-4 rounded-full bg-white/80 px-3 py-1.5 text-xs font-bold backdrop-blur">
                        ★ {product.rating.toFixed(1)}
                      </div>
                      <span aria-hidden="true" className="shop-product text-8xl">{product.icon}</span>
                      <span className="absolute bottom-4 h-3 w-24 rounded-[50%] bg-slate-900/10 blur-md" />
                    </div>
                    <div className="px-3 pb-3 pt-5">
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">{product.category}</p>
                      <div className="mt-2 flex items-start justify-between gap-3">
                        <h2 className="font-serif text-xl leading-tight">{product.name}</h2>
                        <p className="shrink-0 font-bold">${product.price.toFixed(2)}</p>
                      </div>
                      <p className="mt-3 min-h-10 text-sm leading-5 text-slate-500">{product.description}</p>
                      <button
                        type="button"
                        onClick={() => addToCart(product)}
                        className="mt-5 h-12 w-full rounded-full bg-slate-900 text-sm font-bold text-white transition hover:bg-slate-700 active:scale-[0.98]"
                      >
                        Add to cart +
                      </button>
                    </div>
                  </article>
                ))}
              </section>
            ) : (
              <div className="rounded-[26px] border border-dashed border-slate-900/20 bg-white/70 px-6 py-20 text-center">
                <h2 className="font-serif text-3xl">No objects found</h2>
                <p className="mt-2 text-sm text-slate-500">Try another search or filter.</p>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
