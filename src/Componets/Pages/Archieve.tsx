"use client"
import React, { useEffect, useState } from "react";
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
      {data.map((item: Item) => (
        <div
          className="flex flex-row items-center justify-between px-10 border-b border-gray-200"
          key={item.id}
        >
          <div className="flex gap-3">
            <h5>{item.title}</h5>
            <p>{item.description}</p>
          </div>
          <div className="flex gap-6">
            {/* <p
              className="cursor-pointer text-2xl hover:scale-102 transition"
              onClick={() => setarchive(item)}
              >
              {item.archive}
              </p>
            <p>{item.delete}</p> */}
          </div>
        </div>
      ))}
    </div>
    // <div>
    //   {data.map((item) => (
    //     <div key={item}>
    //       <div>
    //         <p>{item}</p>
    //       </div>
    //     </div>
    //   ))}
    // </div>

    // <div className="w-full pt-4">
    //   {data.map((item) => (
    //     <div
    //       className="flex flex-row items-center justify-between px-10 border-b border-gray-200"
    //       key={item.id}
    //     >
    //       <div className="flex gap-3">
    //         <h5>{item.title}</h5>
    //         <p>{item.description}</p>
    //       </div>
    //       <div className="flex gap-6">
    //         {/* <p
    //           className="cursor-pointer text-2xl hover:scale-102 transition"
    //           onClick={() => setarchive(item)}
    //         > */}
    //           {/* {item.archive} */}
    //         {/* </p> */}
    //         {/* <p>{item.delete}</p> */}
    //       </div>
    //     </div>
    //   ))}
    // </div>
  );
}
