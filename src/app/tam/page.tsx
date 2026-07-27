import React from "react";

import But from "./But";


///
// :root {
//   /* --background: #ffffff; */   -----------------------------
//   --foreground: #171717;
// }

////

export default function page() {
  return (
    <div>
      <But
        classname="bg-green-500 "
        Name={["mamad", "aghdas"]}
        style={{color:"purple",fontSize:"1.5rem"}}
      />{" "}
      <div className="space-y-4 p-8">
        <div className="bg-red-500 text-white p-4">Red</div>
        <div className="bg-blue-500 text-white p-4">Blue</div>
        <div className="bg-purple-950 text-white p-4">Purple</div>
        <div className="text-sky-500 text-3xl">Sky Text</div>
      </div>
    </div>
  );
}
