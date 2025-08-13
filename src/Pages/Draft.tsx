import { useEffect, useState } from "react";

export default function Draft() {
  const [draft, setDraftEmail] = useState();
  const [title, setTitle] = useState([]);
  const [visible, setIsVisible] = useState(true);
  useEffect(() => {
    const draftmail = localStorage.getItem("draft-email");
    setDraftEmail(draftmail);
    const gettingtitle = localStorage.getItem("title-subject");
    setTitle(gettingtitle);
  }, []);

  console.log(draft, "Draft mail");

  const cleardraft = () => {
    setIsVisible(false);
  };

  return (
    <div>
      <div className="flex py-2 bg-gray-50 border-t border-b border-gray-200 justify-between px-4">
        <div></div>
        <div
          onClick={cleardraft}
          className="text-red-600 hover:scale-102 cursor-pointer transition"
        >
          Clear draft
        </div>
      </div>
      {visible && (
        <div className="flex flex-col items-start  px-3 w-full pt-4 ">
          <p className="text-gray-700 font-semibold text-xl">Draft Mails</p>
          <div className="flex flex-row gap-3 w-full items-center">
            <div className="flex flex-row mt-2  w-full px-4 bg-yellow-100 border border-yellow-300 py-2 rounded-md">
              <p className="font-semibold">To:</p>
              <p>{title}</p>
            </div>
            <div className="flex flex-row mt-2  w-full px-4 bg-yellow-100 border border-yellow-300 py-2 rounded-md">
              <div>
                {/* <p className="font-semibold">To:</p> */}
                <p></p>
              </div>

              <div className="text-gray-600 pl-4">{draft}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
