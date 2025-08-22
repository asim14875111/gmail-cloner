"use client";
import React, { useEffect, useRef, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";

export default function Archive() {
  const [archive, setArchive] = useState<Item[]>([]);
  const [visible, setIsVisible] = useState(true);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const Divref = useRef<HTMLDivElement>(null);

  interface Item {
    id: number;
    title: string;
    description: string;
  }

 useEffect(() => {
  const fromArchived = JSON.parse(localStorage.getItem("Archived-item") || "[]");
  setArchive(fromArchived);
}, []);
const deleteSelected = (): void => {
  const updated = archive.filter((item) => !selectedIds.includes(item.id));

   const deletedItems = JSON.parse(localStorage.getItem("Deleted-item") || "[]");
  const itemsToDelete = archive.filter((item) => selectedIds.includes(item.id));
  const updatedDeleted = [...deletedItems, ...itemsToDelete];
  localStorage.setItem("Deleted-item", JSON.stringify(updatedDeleted));

   const updatedData = JSON.parse(localStorage.getItem("Data") || "[]").filter(
    (item: Item) => !selectedIds.includes(item.id)
  );
  const updatedArchived = JSON.parse(
    localStorage.getItem("Archived-item") || "[]"
  ).filter((item: Item) => !selectedIds.includes(item.id));

  localStorage.setItem("Data", JSON.stringify(updatedData));
  localStorage.setItem("Archived-item", JSON.stringify(updatedArchived));
  localStorage.setItem("Length-of-archive", updated.length.toString());

  setArchive(updated);
  setSelectedIds([]);
  setSelectAll(false);

  if (selectedItem && selectedIds.includes(selectedItem.id)) {
    setSelectedItem(null);
  }
};

  const toggleSelect = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedIds([]);
      setSelectAll(false);
    } else {
      setSelectedIds(archive.map((item) => item.id));
      setSelectAll(true);
    }
  };

  const showDetailsSection = (item: Item): void => {
    setSelectedItem(item);
  };

  const closeDetailsSection = (): void => {
    setSelectedItem(null);
  };

  const handleClickOutside = (event: MouseEvent): void => {
    if (Divref.current && !Divref.current.contains(event.target as Node)) {
      setSelectedItem(null);
    }
  };

  useEffect(() => {
    if (selectedItem) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [selectedItem]);

  return (
    <div>
       <div className="flex justify-between px-6 items-center py-2 bg-gray-50 border-t border-b border-gray-200">
        {/* <div className="flex items-center gap-2"> */}
          <input
            type="checkbox"
            checked={selectAll}
            onChange={handleSelectAll}
            className="cursor-pointer"
          />
           {selectedIds.length > 0 && (
            <button
              onClick={deleteSelected}
              className="text-red-500 text-xl cursor-pointer hover:scale-105 transition"
              title="Delete selected"
            >
              <RiDeleteBin6Line />
            </button>
          )}
        {/* </div> */}
      </div>

      <div className="w-full flex flex-col gap-4 h-[80vh] overflow-auto px-6 pt-6 pb-10">
        {visible && archive.length > 0 ? (
          <div className="flex flex-col gap-5">
            {archive.map((item) => {
              const isSelected = selectedIds.includes(item.id);
              return (
                <div
                  key={item.id}
                  onClick={() => showDetailsSection(item)}
                  className="flex flex-row justify-between  hover:bg-gray-200  transition items-center py-2 px-2 border rounded-xl border-gray-200 bg-gray-50 cursor-pointer"
                >
                  <div>
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSelect(item.id);
                      }}
                      className="cursor-pointer"
                    />
                  </div>
                  <div className="flex flex-col pl-4 items-start gap-1 flex-1">
                    <h5 className="font-semibold">{item.title}</h5>
                    <p className="line-clamp-1 text-gray-700 text-sm text-start">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-gray-500 text-center mt-6">Archive is empty</p>
        )}

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
