"use client";

import React, { useEffect, useState } from "react";

export default function Calculator() {
  let num = [1, 2, 3, "+", 4, 5, 6, "-", 7, 8, 9, "/"];

  //   let numb1=[0]

  const [numb, setNumb] = useState([0]);

  const [numb1, setNumb1] = useState([0]);

  const handleNumber = (e: any, x: any) => {
    const value = e.target.innerText;

    console.log(value);

    // numb1.push(value);

    // numb.push(value);

    // setNumb1(numb);

    setNumb1([...numb1, value]);

    // if(numb1.includes(+)==){

    //   let n1=numb1.slice(0,+)
    //   let n2 =numb1.slice(+,numb1.length)
    //   numb1 = n1 +n2

    // }

    // if ((numb1[0] = 0)) {
    //   numb1.shift();
    // }

    // console.log(numb);
    console.log(numb1);

    for (let i = 0; i < numb1.length; i++) {
      if (numb1[i].toString() == "+") {
        let plus=numb1.toString().indexOf("+");
       let n1 =numb1.toString().replaceAll(",", "").slice(0,numb1[plus]);
       console.log(n1)
      }
    }

    // useNumb(n)
  };

  // useEffect(() => {
  //   handleNumber(e);
  // }, [numb,numb1]);

  // useEffect(() => {}, [numb1]);

  return (
    <div className="flex flex-col justify-center w-80 mx-auto h-[50%] bg-blue-700">
      <div className="flex justify-center mx-auto my-1 w-[95%] text-white text-center bg-blue-400 ">
        {numb1}
      </div>
      <div className="grid grid-cols-4">
        {num.map((x) => (
          <button
            className="bg-sky-500 m-1"
            key={x}
            onClick={(e) => handleNumber(e, x)}
          >
            {x}
          </button>
        ))}
        {/* <div className="">2</div> */}
      </div>
    </div>
  );
}
