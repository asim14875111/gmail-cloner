"use client";
import React, { useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
export default function Archieve() {
  const [data, setData] = useState([]);
  interface Item {
    id: number;
    title: string;
    description: string;
  }

  useEffect(() => {
    const getteddata = JSON.parse(localStorage.getItem("Data") || "[]");
    setData(getteddata);
  }, []);

  console.log(data, "displaying data from localStorage");

  return (
    <div>
      <div className="flex justify-between px-6 items-center py-2 bg-gray-50 border-t border-b border-gray-200">
        <div className="flex gap-2">
          <input className="cursor-pointer" type="checkbox" />
          <p>Select all</p>
        </div>
        <div>
          <p className="text-red-500 text-xl cursor-pointer hover:scale-102 transition">
            <RiDeleteBin6Line />
          </p>
        </div>
      </div>
      <div className="w-full flex flex-col gap-4 px-6 pt-6 pb-10">
        {data.map((item: Item) => (
          <div
            className="flex flex-row-reverse hover:scale-101 cursor-pointer  transition items-center py-2 justify-self-start px-2 border rounded-xl border-gray-200 bg-gray-50"
            key={item.id}
          >
            <div className="flex flex-col pl-4 items-start gap-2">
              <h5 className="font-semibold">{item.title}</h5>
              <p className="line-clamp-1 text-gray-700 text-sm justify-start items-start text-start">
                {item.description}
              </p>
            </div>
            <div className="flex flex-col gap-2 ">
              <input type="checkbox" className="cursor-pointer" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
