"use client";

import { useState, type MouseEvent } from "react";

const num = [1, 2, 3, "+", 4, 5, 6, "-", 7, 8, 9, "/"];

export default function Calculator() {
  const [display, setDisplay] = useState<Array<number | string>>([0]);

  const handleNumber = (event: MouseEvent<HTMLButtonElement>) => {
    const value = event.currentTarget.innerText;
    setDisplay((previousDisplay) =>
      previousDisplay[0] === 0 && value !== "." ? [value] : [...previousDisplay, value],
    );
  };

  return (
    <div className="flex flex-col justify-center w-80 mx-auto h-[50%] bg-blue-700">
      <div className="flex justify-center mx-auto my-1 w-[95%] text-white text-center bg-blue-400 ">
        {display.join("")}
      </div>
      <div className="grid grid-cols-4">
        {num.map((value) => (
          <button
            className="bg-sky-500 m-1"
            key={String(value)}
            onClick={handleNumber}
          >
            {value}
          </button>
        ))}
      </div>
    </div>
  );
}
