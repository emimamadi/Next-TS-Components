import { Suspense } from "react";
import { ProductGrid } from "./ProductGrid";
import PostList from "./PostList";

export default function Page() {
  return (
    <div className="space-y-8 p-6">
      <Suspense fallback={<div className="rounded-xl bg-sky-100 p-4 text-sky-700">Loading products...</div>}>
        <ProductGrid />
      </Suspense>

      <Suspense fallback={<div className="rounded-xl bg-slate-100 p-4 text-slate-700">Loading posts...</div>}>
        <PostList />
      </Suspense>
    </div>
  );
}
