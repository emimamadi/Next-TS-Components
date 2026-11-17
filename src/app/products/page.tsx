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

type SortOption = "featured" | "price-asc" | "price-desc" | "rating";

const products: Product[] = [
  { id: 1, name: "Everyday Backpack", category: "Accessories", price: 64, rating: 4.8, description: "A lightweight carry-all with room for your daily essentials.", icon: "🎒", color: "from-amber-100 to-orange-50" },
  { id: 2, name: "Studio Headphones", category: "Electronics", price: 129, rating: 4.9, description: "Comfortable over-ear sound for work, travel, and downtime.", icon: "🎧", color: "from-violet-100 to-indigo-50" },
  { id: 3, name: "Ceramic Pour-over Set", category: "Home", price: 42, rating: 4.7, description: "A simple, considered setup for a better morning coffee.", icon: "☕", color: "from-rose-100 to-orange-50" },
  { id: 4, name: "Classic Canvas Sneakers", category: "Apparel", price: 78, rating: 4.6, description: "Everyday canvas sneakers with a clean, versatile profile.", icon: "👟", color: "from-sky-100 to-cyan-50" },
  { id: 5, name: "Minimal Desk Lamp", category: "Home", price: 95, rating: 4.8, description: "Warm, adjustable lighting for a focused workspace.", icon: "💡", color: "from-yellow-100 to-amber-50" },
  { id: 6, name: "Pocket Bluetooth Speaker", category: "Electronics", price: 55, rating: 4.5, description: "Small enough to take anywhere, with room-filling sound.", icon: "🔊", color: "from-blue-100 to-sky-50" },
  { id: 7, name: "Soft-knit Beanie", category: "Apparel", price: 28, rating: 4.4, description: "A cozy, easy-wearing layer made for cooler days.", icon: "🧢", color: "from-emerald-100 to-teal-50" },
  { id: 8, name: "Leather Card Holder", category: "Accessories", price: 36, rating: 4.7, description: "A slim profile for the cards you reach for every day.", icon: "👝", color: "from-orange-100 to-amber-50" },
  { id: 9, name: "Insulated Water Bottle", category: "Accessories", price: 32, rating: 4.6, description: "Keeps drinks cold on the move in a durable steel body.", icon: "🧴", color: "from-cyan-100 to-sky-50" },
  { id: 10, name: "Wireless Charging Pad", category: "Electronics", price: 49, rating: 4.3, description: "A tidy, cable-light way to power your everyday devices.", icon: "🔋", color: "from-fuchsia-100 to-purple-50" },
  { id: 11, name: "Linen Cushion Cover", category: "Home", price: 24, rating: 4.5, description: "A soft linen texture that brings a little warmth to a room.", icon: "🛋️", color: "from-lime-100 to-green-50" },
  { id: 12, name: "Relaxed Cotton Tee", category: "Apparel", price: 34, rating: 4.6, description: "A comfortable everyday staple in soft, breathable cotton.", icon: "👕", color: "from-pink-100 to-rose-50" },
];

const categories = ["All categories", ...new Set(products.map((product) => product.category))];

export default function ProductsPage() {
  const [category, setCategory] = useState("All categories");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const [limit, setLimit] = useState(8);
  const cartItems = useCartItems();

  const filteredProducts = useMemo(() => {
    const priceLimit = maxPrice === "" ? Number.POSITIVE_INFINITY : Number(maxPrice);
    const results = products.filter(
      (product) =>
        (category === "All categories" || product.category === category) &&
        product.price <= priceLimit,
    );

    switch (sortBy) {
      case "price-asc":
        results.sort((first, second) => first.price - second.price);
        break;
      case "price-desc":
        results.sort((first, second) => second.price - first.price);
        break;
      case "rating":
        results.sort((first, second) => second.rating - first.rating);
        break;
    }

    return results;
  }, [category, maxPrice, sortBy]);

  const visibleProducts = filteredProducts.slice(0, limit);
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const addToCart = (product: Product) => {
    updateCartItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === product.id);

      if (existingItem) {
        return currentItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }

      return [...currentItems, { ...product, quantity: 1 }];
    });
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-7xl">
        <header className="mb-10 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-600">
              The everyday edit
            </p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">Products</h1>
            <p className="mt-3 max-w-xl text-slate-600">
              Thoughtful picks for your home, work, and everywhere in between.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/products/cart"
              className="inline-flex items-center gap-2 rounded-xl border border-indigo-200 bg-indigo-50 px-4 py-2.5 font-medium text-indigo-700 shadow-sm transition hover:bg-indigo-100"
            >
              Cart
              <span className="rounded-full bg-indigo-600 px-2 py-0.5 text-xs font-semibold text-white">
                {itemCount}
              </span>
            </Link>
            <Link
              href="/"
              className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 font-medium text-slate-700 shadow-sm transition hover:bg-slate-100"
            >
              Back home
            </Link>
          </div>
        </header>

        <section
          aria-label="Product filters"
          className="mb-8 grid gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:grid-cols-2 lg:grid-cols-4"
        >
          <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
            Category
            <select
              className="rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              {categories.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
            Maximum price ($)
            <input
              className="rounded-lg border border-slate-300 px-3 py-2.5 text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              type="number"
              min="0"
              step="1"
              placeholder="Any price"
              value={maxPrice}
              onChange={(event) => setMaxPrice(event.target.value)}
            />
          </label>

          <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
            Sort by
            <select
              className="rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value as SortOption)}
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
              <option value="rating">Top rated</option>
            </select>
          </label>

          <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
            Show
            <select
              className="rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              value={limit}
              onChange={(event) => setLimit(Number(event.target.value))}
            >
              <option value={4}>4 products</option>
              <option value={8}>8 products</option>
              <option value={12}>12 products</option>
            </select>
          </label>
        </section>

        <div className="mb-5 flex items-center justify-between">
          <p aria-live="polite" className="text-sm text-slate-600">
            Showing {visibleProducts.length} of {filteredProducts.length} products
          </p>
          {itemCount > 0 ? (
            <Link href="/products/checkout" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
              Proceed to checkout
            </Link>
          ) : null}
        </div>

        {visibleProducts.length > 0 ? (
          <section aria-label="Products" className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {visibleProducts.map((product) => (
              <article
                key={product.id}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div
                  aria-hidden="true"
                  className={`flex h-44 items-center justify-center bg-linear-to-br ${product.color}`}
                >
                  <span className="text-7xl drop-shadow-sm">{product.icon}</span>
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
                      {product.category}
                    </p>
                    <p className="text-sm text-amber-600">★ {product.rating.toFixed(1)}</p>
                  </div>
                  <h2 className="mt-2 text-lg font-semibold">{product.name}</h2>
                  <p className="mt-2 min-h-12 text-sm leading-6 text-slate-600">{product.description}</p>
                  <p className="mt-4 text-xl font-bold">${product.price.toFixed(2)}</p>
                  <button
                    type="button"
                    onClick={() => addToCart(product)}
                    className="mt-4 w-full rounded-xl bg-indigo-600 px-4 py-2.5 font-medium text-white transition hover:bg-indigo-500"
                  >
                    Add to cart
                  </button>
                </div>
              </article>
            ))}
          </section>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
            <h2 className="text-lg font-semibold">No products match these filters</h2>
            <p className="mt-2 text-sm text-slate-600">
              Try a different category or increase the maximum price.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
