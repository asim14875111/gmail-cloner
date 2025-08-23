import { useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
export default function Draft() {
  const [draft, setDraftEmail] = useState<string | null>(null);
  const [data, setData] = useState<string | null>(null);
  const [title, setTitle] = useState<string | null>(null);
  const [subject, setSubject] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [founder, setFounder] = useState<string | null>(null);
  const [visible, setIsVisible] = useState(true);

  useEffect(() => {
    // const interval = setInterval(() => {
    setDraftEmail(localStorage.getItem("draft-email"));
    setTitle(localStorage.getItem("title-subject"));
    setData(localStorage.getItem("compose-draft-title"));
    setSubject(localStorage.getItem("compose-subject"));
    setDescription(localStorage.getItem("compose-description"));
    setFounder(localStorage.getItem("draft-founder"));
    // }, 200);
    // return () => clearInterval(interval);
  }, []);

  const updateDraftLength = () => {
    let count = 0;
    if (
      (localStorage.getItem("title-subject") &&
        localStorage.getItem("title-subject")!.trim() !== "") ||
      (localStorage.getItem("draft-founder") &&
        localStorage.getItem("draft-founder")!.trim() !== "") ||
      (localStorage.getItem("draft-email") &&
        localStorage.getItem("draft-email")!.trim() !== "")
    ) {
      count += 1;
    }
    if (
      (localStorage.getItem("compose-draft-title") &&
        localStorage.getItem("compose-draft-title")!.trim() !== "") ||
      (localStorage.getItem("compose-subject") &&
        localStorage.getItem("compose-subject")!.trim() !== "") ||
      (localStorage.getItem("compose-description") &&
        localStorage.getItem("compose-description")!.trim() !== "")
    ) {
      count += 1;
    }
    localStorage.setItem("draft-length", count.toString());
    window.dispatchEvent(new Event("drafts-updated"));
  };

  const cleardraft = (): void => {
    // Move all drafts to Trash before clearing
    const deletedItems = JSON.parse(localStorage.getItem("Deleted-item") || "[]");
    let itemsToDelete = [];
    if (
      (title && title.trim() !== "") ||
      (founder && founder.trim() !== "") ||
      (draft && draft.trim() !== "")
    ) {
      itemsToDelete.push({
        id: Date.now(),
        title: title || "",
        description: draft || "",
      });
    }
    if (
      (data && data.trim() !== "") ||
      (subject && subject.trim() !== "") ||
      (description && description.trim() !== "")
    ) {
      itemsToDelete.push({
        id: Date.now() + 1,
        title: data || "",
        description: description || "",
      });
    }
    const updatedDeleted = [...deletedItems, ...itemsToDelete];
    localStorage.setItem("Deleted-item", JSON.stringify(updatedDeleted));
    localStorage.setItem("Deleted-item-length", JSON.stringify(updatedDeleted.length));

    localStorage.setItem("draft-length-compose", "0");
    localStorage.removeItem("draft-email-compose");

    setIsVisible(false);
    setTitle(null);
    setFounder(null);
    setDraftEmail(null);
    setData(null);
    setSubject(null);
    setDescription(null);

    localStorage.removeItem("title-subject");
    localStorage.removeItem("draft-founder");
    localStorage.removeItem("draft-email");
    localStorage.removeItem("compose-draft-title");
    localStorage.removeItem("compose-subject");
    localStorage.removeItem("compose-description");

    updateDraftLength();
  };

  const deleteFirstRow = () => {
    // Move to Trash
    const deletedItems = JSON.parse(localStorage.getItem("Deleted-item") || "[]");
    const itemToDelete = {
      id: Date.now(),
      title: title || "",
      description: draft || "",
    };
    const updatedDeleted = [...deletedItems, itemToDelete];
    localStorage.setItem("Deleted-item", JSON.stringify(updatedDeleted));
    localStorage.setItem("Deleted-item-length", JSON.stringify(updatedDeleted.length));

  setTitle(null);
  setFounder(null);
  setDraftEmail(null);
  localStorage.removeItem("draft-email-compose");

  localStorage.removeItem("title-subject");
  localStorage.removeItem("draft-founder");
  localStorage.removeItem("draft-email");
  localStorage.setItem("draft-length-compose", "0");
  updateDraftLength();
  };

  const deleteSecondRow = () => {
     const deletedItems = JSON.parse(localStorage.getItem("Deleted-item") || "[]");
    const itemToDelete = {
      id: Date.now(),
      title: data || "",
      description: description || "",
    };
    const updatedDeleted = [...deletedItems, itemToDelete];
    localStorage.setItem("Deleted-item", JSON.stringify(updatedDeleted));
    localStorage.setItem("Deleted-item-length", JSON.stringify(updatedDeleted.length));

  setData(null);
  setSubject(null);
  setDescription(null);
  localStorage.removeItem("draft-email-compose");

  localStorage.removeItem("compose-draft-title");
  localStorage.removeItem("compose-subject");
  localStorage.removeItem("compose-description");
  updateDraftLength();
  };

  const hasFirstRow =
    (title && title.trim() !== "") ||
    (founder && founder.trim() !== "") ||
    (draft && draft.trim() !== "");

  const hasSecondRow =
    (data && data.trim() !== "") ||
    (subject && subject.trim() !== "") ||
    (description && description.trim() !== "");

  return (
    <div>
      <div className="flex py-2 bg-gray-50 border-t border-b border-gray-200 justify-between px-4">
        <div></div>
        {(hasFirstRow || hasSecondRow) && (
          <div
            onClick={cleardraft}
            className="text-red-600 hover:scale-102 cursor-pointer transition"
          >
            Clear draft
          </div>
        )}
      </div>

      {visible && (hasFirstRow || hasSecondRow) ? (
        <div className="flex flex-col">
          <div className="flex flex-col items-start px-3 w-full pt-4">
            <p className="text-gray-700 font-semibold text-xl">Draft Mails</p>

            {hasFirstRow && (
              <div className="flex flex-col md:flex-row gap-4 w-full items-start mt-3 pt-0 bg-gray-50 p-0 pr-2 border border-gray-200 rounded-xl">
                <div className="flex flex-col w-full">
                  {title && title.trim() !== "" && (
                    <div className="flex gap-2 px-4 py-2 rounded-xl w-full md:w-1/3">
                      <p className="font-semibold">To:</p>
                      <p className=" ">{title}</p>
                    </div>
                  )}
                  <div className="flex">
                    {founder && founder.trim() !== "" && (
                      <div className="flex gap-2  px-4 py-2 rounded-xl w-full md:w-1/3">
                        <p className="font-semibold">Subject:</p>
                        <p className=" ">{founder}</p>
                      </div>
                    )}
                    {draft && draft.trim() !== "" && (
                      <div className="flex gap-2  px-4 py-2 rounded-xl w-full md:w-1/3">
                        <p className="font-semibold">Description:</p>
                        <p className="whitespace-pre-line break-words">
                          {draft}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                <button
                  onClick={deleteFirstRow}
                  className="text-red-400 text-lg items-center self-center hover:scale-105 transition cursor-pointer"
                >
                  <RiDeleteBin6Line />
                </button>
              </div>
            )}
          </div>

          {hasSecondRow && (
            <div className=" flex flex-row gap-4 mx-3 mt-3 px-3 pt-1 bg-gray-50 p-0 border border-gray-200 rounded-xl">
              <div className="flex flex-col w-full">
                {data && data.trim() !== "" && (
                  <div className="flex gap-2  px-4 py-2 rounded-xl w-full md:w-1/3">
                    <p className="font-semibold">To:</p>
                    <p className="whitespace-pre-line break-words">{data}</p>
                  </div>
                )}
                <div className="flex flex-col md:flex md:flex-row">
                  {subject && subject.trim() !== "" && (
                    <div className="flex gap-2  px-4 py-2 rounded-xl w-full md:w-1/3">
                      <p className="font-semibold">Subject:</p>
                      <p className=" ">{subject}</p>
                    </div>
                  )}

                  {description && description.trim() !== "" && (
                    <div className="flex gap-2 px-4 py-2 rounded-xl w-full md:w-1/3">
                      <p className="font-semibold">Description:</p>
                      <p className=" ">{description}</p>
                    </div>
                  )}
                </div>
              </div>

              <button
                onClick={deleteSecondRow}
                className="text-red-400 text-lg items-center self-center hover:scale-105 transition cursor-pointer"
              >
                <RiDeleteBin6Line />
              </button>
            </div>
          )}
        </div>
      ) : (
        <p className="text-gray-500 mt-6 px-5 text-center">
          No drafts available!
        </p>
      )}
    </div>
  );
}
