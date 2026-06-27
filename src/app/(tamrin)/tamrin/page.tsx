import React from "react";
import Calculator from "./Calculator";

import {ProductGrid} from "./ProductGrid";

import PostList from "./PostList";

// async function getData() {
//   const res = await fetch("https://dummyjson.com/products");

//   const result = await res.json();

//   return result;
// }

export default function Page() {
//   const Result = getData();

//   console.log(Result);




  return (
    <div>
      {/* <Calculator/> */}

      {/* <ProductList Result={Result} /> */}

      <ProductGrid/>
      <PostList/>
    </div>
  );
}
