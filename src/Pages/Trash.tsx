"use client";
import React, { useEffect, useRef, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";

interface Item {
  id: number;
  title: string;
  description: string;
}

export default function Trash() {
  const [data, setData] = useState<Item[]>([]);
  const [deletedDataFromArchive, setDeletedDataFromArchive] = useState<Item[]>(
    []
  );
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const Divref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const deletedFromTrash: Item[] = JSON.parse(
      localStorage.getItem("Deleted-item") || "[]"
    );
    setData(deletedFromTrash);

    const deletedFromArchive: Item[] = JSON.parse(
      localStorage.getItem("Archived-item") || "[]"
    );
    setDeletedDataFromArchive(deletedFromArchive);

    const total = deletedFromTrash.length + deletedFromArchive.length;
    localStorage.setItem("Deleted-item-length", JSON.stringify(total));
  }, []);

  const clearTrash = (): void => {
    setData([]);
    setDeletedDataFromArchive([]);
    localStorage.setItem("Deleted-item", JSON.stringify([]));
    localStorage.setItem("Data", JSON.stringify([]));
    localStorage.setItem("Deleted-item-length", JSON.stringify(0));
    setSelectedItem(null);
    setSelectedIds([]);
    setSelectAll(false);
  };

  const deleteSelected = (): void => {
    const updatedTrash = data.filter((item) => !selectedIds.includes(item.id));
    const updatedArchive = deletedDataFromArchive.filter(
      (item) => !selectedIds.includes(item.id)
    );
      const masterData: Item[] = JSON.parse(
    localStorage.getItem("MasterData") || "[]"
  );
  const updatedMasterData = masterData.filter(
    (item) => !selectedIds.includes(item.id)
  );
  localStorage.setItem("MasterData", JSON.stringify(updatedMasterData));

    const inboxData: Item[] = JSON.parse(
      localStorage.getItem("Inbox-data") || "[]"
    );
    const updatedInbox = inboxData.filter(
      (item) => !selectedIds.includes(item.id)
    );
    localStorage.setItem("Inbox-data", JSON.stringify(updatedInbox));

    setData(updatedTrash);
    setDeletedDataFromArchive(updatedArchive);

    localStorage.setItem("Deleted-item", JSON.stringify(updatedTrash));
    localStorage.setItem("Archived-item", JSON.stringify(updatedArchive));


    const total = updatedTrash.length + updatedArchive.length;
    localStorage.setItem("Deleted-item-length", JSON.stringify(total));

    setSelectedIds([]);
    setSelectAll(false);
    if (selectedItem && selectedIds.includes(selectedItem.id)) {
      setSelectedItem(null);
    }
  };

  const showDetailsSection = (item: Item): void => {
    setSelectedItem(item);
  };

  const closeDetailsSection = (): void => {
    setSelectedItem(null);
  };

  const handleclickoutside = (event: MouseEvent): void => {
    if (Divref.current && !Divref.current.contains(event.target as Node)) {
      setSelectedItem(null);
    }
  };

  useEffect(() => {
    if (selectedItem) {
      document.addEventListener("mousedown", handleclickoutside);
      return () => {
        document.removeEventListener("mousedown", handleclickoutside);
      };
    }
  }, [selectedItem]);

  const hasData = data.length > 0 || deletedDataFromArchive.length > 0;
  const allItems = [...data, ...deletedDataFromArchive];

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedIds([]);
    } else {
      setSelectedIds(allItems.map((item) => item.id));
    }
    setSelectAll(!selectAll);
  };

  const handleSelectOne = (id: number) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((sid) => sid !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  return (
    <div>
      {/* Header with main checkbox + delete */}
      <div className="flex justify-between px-6 items-center py-2 bg-gray-50 border-t border-b border-gray-200">
        <input
          type="checkbox"
          checked={selectAll}
          onChange={handleSelectAll}
          className="cursor-pointer w-4 h-4"
        />
        {/* Show delete icon at top if one or more selected */}
        {selectedIds.length > 0 && (
          <button
            onClick={deleteSelected}
            className="text-red-500 text-xl cursor-pointer hover:scale-105 transition"
            title="Delete selected"
          >
            <RiDeleteBin6Line />
          </button>
        )}

        {/* {hasData && (
          <button
            onClick={clearTrash}
            className="text-red-500 text-xl cursor-pointer hover:scale-105 transition"
            title="Clear Trash"
          >
            <RiDeleteBin6Line />
          </button>
        )} */}
      </div>

      <div className="w-full flex flex-col gap-4 h-[80vh] overflow-auto px-6 pt-6 pb-10">
        {hasData ? (
          <div className="flex flex-col gap-5">
            {allItems.map((item: Item) => (
              <div
                key={item.id}
                className="flex items-start gap-3 hover:bg-gray-200 transition py-2 px-2 border rounded-xl border-gray-200 bg-gray-50"
              >
                <input
                  type="checkbox"
                  checked={selectedIds.includes(item.id)}
                  onChange={() => handleSelectOne(item.id)}
                  className="cursor-pointer mt-1"
                />
                <div
                  onClick={() => showDetailsSection(item)}
                  className="flex flex-col items-start gap-1 flex-1 cursor-pointer"
                >
                  <h5 className="font-semibold">{item.title}</h5>
                  <p className="line-clamp-1 text-gray-700 text-sm text-start">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center mt-6">Trash is empty</p>
        )}

        {/* Details modal */}
        {selectedItem && (
          <div className="p-4 border-t mt-0 bg-[#00000075] pt-40 fixed inset-0 shadow">
            <div className="self-center">
              <div
                ref={Divref}
                className="bg-white px-6 py-4 flex rounded-md justify-self-center"
              >
                <div className="w-fit">
                  <div className="flex flex-col text-start">
                    <p className="font-semibold">Subject:</p>
                    <p className="text-sm text-gray-600">
                      {selectedItem.title}
                    </p>
                  </div>
                  <div className="flex w-fit flex-col">
                    <p className="font-semibold text-start pt-4">
                      Description:
                    </p>
                    <p className="text-start max-w-[400px] text-sm text-gray-600">
                      {selectedItem.description}
                    </p>
                  </div>
                  <button
                    onClick={closeDetailsSection}
                    className="mt-8 px-4 py-2 bg-gray-200 w-full cursor-pointer rounded hover:bg-gray-300"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
