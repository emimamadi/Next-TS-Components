// async function fetchData() {
//       const res = await fetch('https://dummyjson.com/products');
//       const data = await res.json();
//       setProductsData(data.products);
//   }

export async function getData() {
  const res = await fetch("https://dummyjson.com/products");
  const data = await res.json();
  const allData = data.products;

  return allData;
}

import React from "react";
import ProductList from "./ProductList";

export const ProductGrid = async () => {
  const allData = await getData();
  return (


    <ProductList allData={allData}/>
    // <div>
    //   <h1>Fetched Data</h1>
    //   {allData ? (
    //     <ul>
    //       {allData.map((item: any) => (
    //         <li key={item.id}>{item.title}</li>
    //       ))}
    //     </ul>
    //   ) : (
    //     <p>No data available</p>
    //   )}
    // </div>
  );
};





// import React from 'react'

// // export default function ProductGrid() {
// //   return (
// //     <div>ProductGrid</div>
// //   )
// // }

// type product ={
//   title:string
// }

// // components/ProductList.jsx

// export default function ProductGrid({ products }:{products:product}) {
//   return (
//     <div>
//       {products.map((product:any) => (
//         <div key={product.id}>
//           <h3>{product.title}</h3>
//           <p>${product.price}</p>
//         </div>
//       ))}
//     </div>
//   );
// }
