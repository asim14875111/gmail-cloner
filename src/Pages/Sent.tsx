import { useEffect, useState } from "react";

export default function Sent() {
  const [sentmails, setSentMails] = useState([]);
  const [title, setTitle] = useState([]);
  const [visible, setIsVisible] = useState(true);

  useEffect(() => {
    const gettingdata = JSON.parse(localStorage.getItem("Sent-value") || "[]");
    setSentMails(gettingdata);
    const title = JSON.parse(localStorage.getItem("title") || "[]");
    setTitle(title);
  }, []);

  console.log(sentmails, "--------Getting sent mails");

  const clearall = () => {
    setIsVisible(false);
  };

  return (
    <div>
      <div className="flex justify-between px-5 bg-gray-50 py-1 border-t border-b border-gray-200">
        <div></div>
        <div className="text-red-400 hover:text-red-500 cursor-pointer" onClick={clearall}>Clear all</div>
      </div>
      {visible && (
        <div className="flex flex-col items-start pt-8 px-5">
          <p className="text-gray-500 font-semibold">Sent mails</p>
          <div className="flex flex-row gap-4 w-full pt-6 items-center">
            <div className="flex flex-col w-6/12 gap-6">
              {title.map((item, index) => (
                <div
                  className="flex flex-row bg-gray-100 w-full px-4 gap-4 rounded-md border border-gray-300 py-2 items-center "
                  key={index}
                >
                  <p className="font-semibold text-gray-700 ">To:</p>
                  <p className="text-[15px] font-semibold text-gray-700">
                    {item}
                  </p>
                </div>
              ))}
            </div>
            <div className="flex flex-col w-full gap-6">
              {sentmails.map((mail, index) => (
                <div
                  className="flex w-full bg-gray-100 py-2  px-2 rounded-[8px] border border-gray-300"
                  key={index}
                >
                  <div className="flex items-center">
                    <div>{/* <p className="font-semibold  ">To:</p> */}</div>
                    <div className="text-gray-700 pl-4">{mail}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
