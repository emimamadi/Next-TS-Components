import React from "react";

type data={
    map(arg0: (item: any) => React.JSX.Element): React.ReactNode;
    id:string,
    title:string
}

export default function ProductList({allData}:{allData:data}) {


// console.log("data == ", allData)

//  allData.title
  return (
    <div className="bg-amber-500 w-[95%] mx-auto flex flex-col justify-center my-10 ">
      <h1 className="w-full h-10 text-center text-red-500">Fetched Data</h1>
      {allData ? (
        <ul className="bg-blue-300 w-[80%] mx-auto h-10">
          {allData.map((item: any) => (
            <li key={item.id}>{item.title}</li>
          ))}
        </ul>
      ) : (
        <p className="bg-red-300">No data available</p>
      )}
    </div>
  );
}
