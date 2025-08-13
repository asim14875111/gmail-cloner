"use client";
import React, { useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
export default function Archieve() {
  const [data, setData] = useState([]);
  const [items, setAllItems] = useState([]);
  const [visible, setIsVisible] = useState(true);
  const [display, setDisplay] = useState(false);
  interface Item {
    id: number;
    title: string;
    description: string;
  }

  useEffect(() => {
    const getteddata = JSON.parse(localStorage.getItem("Deleted-item") || "[]");
    setData(getteddata);
    const allitems = JSON.parse(localStorage.getItem("All items") || "[]");
    setAllItems(allitems);
  }, []);
  console.log(items, "10, ids");

  console.log(data, "displaying data from localStorage");

  const cleartrash = () => {
    setIsVisible(false);
  };

  const toggledlt = () => {
    setDisplay(true);
  };

  return (
    <div>
      <div className="flex justify-between px-6 items-center py-2 bg-gray-50 border-t border-b border-gray-200">
        <div className="flex gap-2">
          {/* <input
            onClick={toggledlt}
            className="cursor-pointer w-4 h-4"
            type="checkbox"
          /> */}
        </div>
        <div>
          {/* {display && ( */}
            <p
              onClick={cleartrash}
              className="text-red-500 text-xl cursor-pointer hover:scale-106 transition"
            >
              <RiDeleteBin6Line />
            </p>
          {/* )} */}
        </div>
      </div>
      <div className="w-full flex flex-col gap-4 h-[80vh] overflow-auto px-6 pt-6 pb-10">
        {visible && (
          <div className="flex flex-col gap-5">
            {data.map((item: Item) => (
              <div
                className="flex flex-row-reverse hover:scale-101 cursor-pointer  transition items-center py-2 justify-self-start px-2 border rounded-xl border-gray-200 bg-gray-50"
                key={item.id}
              >
                <div className="flex flex-col pl-4 items-start gap-1">
                  <h5 className="font-semibold">{item.title}</h5>
                  <p className="line-clamp-1 text-gray-700 text-sm justify-start items-start text-start">
                    {item.description}
                  </p>
                </div>
                {/* <div className="flex flex-col gap-2 ">
                  {/* <input type="checkbox" className="cursor-pointer" /> */}
                {/* </div> */} 
              </div>
            ))}
          </div>
        )}
        {visible && (
          <div className="flex flex-col gap-5">
            {items.map((item: Item) => (
              <div
                className="flex flex-row-reverse hover:scale-101 cursor-pointer  transition items-center py-2 justify-self-start px-2 border rounded-xl border-gray-200 bg-gray-50"
                key={item.id}
              >
                <div className="flex flex-col pl-4 items-start gap-1">
                  <h5 className="font-semibold">{item.title}</h5>
                  <p className="line-clamp-1 text-gray-700 text-sm justify-start items-start text-start">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
