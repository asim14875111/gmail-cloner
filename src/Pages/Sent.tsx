import { useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";

export default function Sent() {
  const [sentmails, setSentMails] = useState<string[]>([]);
  const [title, setTitle] = useState<string[]>([]);
  const [subject, setSubject] = useState<string[]>([]);
  const [visible, setIsVisible] = useState<boolean>(true);
  interface ComposeData {
    receivername: string;
    subject: string;
    description: string;
    // Add other fields if needed
  }
  const [composedata, setComposeData] = useState<ComposeData[]>([]);
  const [selectedSimple, setSelectedSimple] = useState<number[]>([]);
  const [selectedCompose, setSelectedCompose] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const gettingdata = JSON.parse(
        localStorage.getItem("Sent-value") || "[]"
      );
      setSentMails(gettingdata);

      const storedTitle = JSON.parse(localStorage.getItem("title") || "[]");
      setTitle(storedTitle);

      const data = JSON.parse(localStorage.getItem("compose-data") || "[]");
      setComposeData(data);

      const founder = JSON.parse(localStorage.getItem("founder") || "[]");
      setSubject(founder);

      localStorage.setItem(
        "sent-length",
        JSON.stringify(gettingdata.length + data.length)
      );

      const drafts = JSON.parse(localStorage.getItem("drafts") || "[]");
      localStorage.setItem("draft-length", JSON.stringify(drafts.length));
    }, 200);
    return () => clearInterval(interval);
  }, []);

  const deleteSimpleRow = (index: number) => {
    const updatedTitle = title.filter((_, i) => i !== index);
    const updatedSubject = subject.filter((_, i) => i !== index);
    const updatedSent = sentmails.filter((_, i) => i !== index);

    setTitle(updatedTitle);
    setSubject(updatedSubject);
    setSentMails(updatedSent);

    localStorage.setItem("title", JSON.stringify(updatedTitle));
    localStorage.setItem("founder", JSON.stringify(updatedSubject));
    localStorage.setItem("Sent-value", JSON.stringify(updatedSent));

    setSelectedSimple((prev) => prev.filter((i) => i !== index));
    const updatedCompose = JSON.parse(
      localStorage.getItem("compose-data") || "[]"
    );
    localStorage.setItem(
      "sent-length",
      JSON.stringify(updatedSent.length + updatedCompose.length)
    );
  };

  const deleteComposeRow = (index: number) => {
    const updatedSent = JSON.parse(localStorage.getItem("Sent-value") || "[]");
    localStorage.setItem(
      "sent-length",
      JSON.stringify(updatedSent.length + updatedCompose.length)
    );
    const updatedCompose = composedata.filter((_, i) => i !== index);
    setComposeData(updatedCompose);
    localStorage.setItem("compose-data", JSON.stringify(updatedCompose));

    setSelectedCompose((prev) => prev.filter((i) => i !== index));
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedSimple([]);
      setSelectedCompose([]);
      setSelectAll(false);
    } else {
      setSelectedSimple(title.map((_, i) => i));
      setSelectedCompose(composedata.map((_, i) => i));
      setSelectAll(true);
    }
  };

  const toggleSimpleSelect = (index: number) => {
    setSelectedSimple((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const toggleComposeSelect = (index: number) => {
    setSelectedCompose((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const deleteSelected = () => {
    const updatedTitle = title.filter((_, i) => !selectedSimple.includes(i));
    const updatedSubject = subject.filter((_, i) => !selectedSimple.includes(i));
    const updatedSent = sentmails.filter((_, i) => !selectedSimple.includes(i));

    setTitle(updatedTitle);
    setSubject(updatedSubject);
    setSentMails(updatedSent);

    localStorage.setItem("title", JSON.stringify(updatedTitle));
    localStorage.setItem("founder", JSON.stringify(updatedSubject));
    localStorage.setItem("Sent-value", JSON.stringify(updatedSent));

    const updatedCompose = composedata.filter(
      (_, i) => !selectedCompose.includes(i)
    );
    setComposeData(updatedCompose);
    localStorage.setItem("compose-data", JSON.stringify(updatedCompose));

    setSelectedSimple([]);
    setSelectedCompose([]);
    setSelectAll(false);
  };

  const hasAnySelected =
    selectedSimple.length > 0 || selectedCompose.length > 0;

  return (
    <div>
      <div className="flex justify-between px-5 bg-gray-50 py-2 border-t border-b border-gray-200 items-center">
        {/* <div className="flex items-center justify-between "> */}
        <input
          className="cursor-pointer"
          checked={selectAll}
          onChange={handleSelectAll}
          type="checkbox"
        />
        {hasAnySelected && (
          <button
            onClick={deleteSelected}
            className="text-gray-600 hover:text-gray-500 cursor-pointer"
          >
            <RiDeleteBin6Line />
          </button>
        )}
        {/* </div> */}
      </div>

      {visible && (title.length > 0 || composedata.length > 0) ? (
        <div>
          {title.length > 0 && (
            <div className="flex flex-col w-full items-start pt-8 px-5">
              <p className="text-gray-500 font-semibold">Sent mails</p>
              <div className="flex flex-col gap-4 w-full py-3">
                {title.map((toItem, index) => (
                  <div
                    key={index}
                    className="flex flex-row gap-4 w-full items-center bg-gray-50 hover:bg-gray-200 cursor-pointer  pl-4 border border-gray-200 rounded-xl"
                  >
                    <input
                      className="cursor-pointer"
                      checked={selectedSimple.includes(index)}
                      onChange={() => toggleSimpleSelect(index)}
                      type="checkbox"
                    />
                    <div className="flex flex-col  w-full mt-1">
                      <div className="flex gap-2 px-4 py-2 rounded-xl w-1/3 items-center pl-2">
                        <p className="font-semibold text-gray-700">To:</p>
                        <p className="text-gray-900 font-semibold ">{toItem}</p>
                      </div>
                      <div className="flex">
                        <div className="flex gap-2 px-4 py-2 rounded-xl w-1/3 pt-0">
                          <p className="font-semibold text-gray-600">
                            Subject:
                          </p>
                          <div className="text-gray-700">{subject[index]}</div>
                        </div>
                        <div className="flex gap-2 px-4 py-2 rounded-xl w-1/3 pt-0">
                          <p className="font-semibold text-gray-600">
                            Description:
                          </p>
                          <div className="text-gray-700 line-clamp-1">
                            {sentmails[index]}
                          </div>
                        </div>
                      </div>
                    </div>
                    {selectedSimple.includes(index) && (
                      <button
                        onClick={() => deleteSimpleRow(index)}
                        className="text-red-400 text-lg hover:scale-105 transition cursor-pointer"
                      >
                        {/* <RiDeleteBin6Line /> */}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {composedata.length > 0 && (
            <div className="mt-1 px-5">
              {composedata.map((data, index) => (
                <div
                  className="flex gap-4 mb-4 items-center mt-4 bg-gray-50 p-0 pl-3 border border-gray-200 rounded-xl hover:bg-gray-200 cursor-pointer"
                  key={index}
                >
                  <input
                    type="checkbox"
                    checked={selectedCompose.includes(index)}
                    onChange={() => toggleComposeSelect(index)}
                    className="cursor-pointer"
                  />

                  <div className="flex flex-col w-full">
                    <div className="flex gap-2 px-4 py-2 rounded-xl w-1/3">
                      <p className="font-semibold">To:</p>
                      <p className="font-bold text-gray-900">
                        {data.receivername}
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex sm:flex-row gap-2 w-full">
                      <div className="flex gap-2 px-4 py-2 rounded-xl pt-0 w-1/3">
                        <p className="font-semibold text-gray-500">Subject:</p>
                        <p className="text-gray-500">{data.subject}</p>
                      </div>
                      <div className="flex gap-2 px-4 py-2 rounded-xl pt-0 w-1/3">
                        <p className="font-semibold text-gray-600">
                          Description:
                        </p>
                        <p className="line-clamp-1 text-gray-500">
                          {data.description}
                        </p>
                      </div>
                    </div>
                  </div>
                  {selectedCompose.includes(index) && (
                    <button
                      onClick={() => deleteComposeRow(index)}
                      className="text-red-400 text-lg hover:scale-105 transition cursor-pointer"
                    >
                      {/* <RiDeleteBin6Line /> */}
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <p className="text-gray-500 mt-10 text-center">No sent messages!</p>
      )}
    </div>
  );
}
