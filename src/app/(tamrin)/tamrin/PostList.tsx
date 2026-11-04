type Post = {
  id: string;
  title: string;
};

export default async function PostList() {
  const response = await fetch("https://api.vercel.app/blog");
  const posts: Post[] = await response.json();

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}


// app/products/page.jsx

// import ProductGrid from "./ProductGrid";

// async function getProducts() {
//   const res = await fetch("https://dummyjson.com/products");
//   return res.json();
// }

// export default async function ProductsPage() {
//   const { products } = await getProducts();

//   return <ProductGrid products={products} />;
// }






// export default function ProductList({Result}:{Result:Promise<{ id: string; title: string }[]>}) {

//     console.log("Product list ==",Result, )
//   return (
//     <>
    
//     <div>ProductList</div>
//     <div className=""></div>
//     </>
//   )
// }
