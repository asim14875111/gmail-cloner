"use client";
import React, { useEffect, useState } from "react";
export default function Trash() {
  const [data, setData] = useState([]);
  interface Item {
    id: number;
    title: string;
    description: string;
  }

  useEffect(() => {
    const getteddata = JSON.parse(localStorage.getItem("Deleted-item") || "[]");
    setData(getteddata);
  }, []);

  console.log(data, "displaying data from localStorage");
  return (
    <div>
      {data.map((item: Item) => (
        <div
          className="flex flex-row items-center justify-between px-10 border-b border-gray-200"
          key={item.id}
        >
          <div className="flex gap-3">
            <h5>{item.title}</h5>
            <p>{item.description}</p>
          </div>
          {/* <div className="flex gap-6"></div> */}
        </div>
      ))}
    </div>
  );
}
