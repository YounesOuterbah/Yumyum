"use client";
import { useEffect, useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";

export default function Banner() {
  const items: string[] = ["Tools", "Cars", "Camers", "Sport Equipment", "Everything"];

  let [num, setNum] = useState<number>(0);
  let [index, setIndex] = useState<string>();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex(items[num]);
      setNum((num + 1) % items.length);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [num]);
  return (
    <div className="bg z-10">
      <div className="container text-white text-center flex flex-col items-center justify-center h-full">
        <h1 className="text-4xl font-bold drop-shadow-2xl">Rent {index}</h1>
        <p className="text-4xl font-bold my-4">from people in your area in just a few clicks</p>
        <div className="w-1/3 relative">
          <FaMagnifyingGlass className="absolute top-1/2 -mt-2 left-2 text-blue-600" />
          <input
            type="search"
            className="p-3 pl-8 text-black  outline-none w-full rounded"
            placeholder="Cars, drones, electronics etc"
          />
        </div>
      </div>
    </div>
  );
}
