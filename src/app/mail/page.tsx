"use client";
export const dynamic = "force-dynamic";

import React, { useEffect, useRef, useState } from "react";
import { TbInbox } from "react-icons/tb";
import { LuSendHorizontal } from "react-icons/lu";
import {
  MdOutlineDrafts,
  MdCloseFullscreen,
  MdFormatColorText,
  MdOutlineInsertPhoto,
  MdOutlineInsertEmoticon,
} from "react-icons/md";
import { FaPen, FaGoogleDrive, FaChevronDown } from "react-icons/fa6";
import Image from "next/image";
import { HiOutlineQuestionMarkCircle } from "react-icons/hi";
import { IoIosSettings, IoIosClose } from "react-icons/io";
import { SiGooglegemini } from "react-icons/si";
import { IoTrashOutline, IoAttach } from "react-icons/io5";
import { RiInboxArchiveLine } from "react-icons/ri";
import { SlOptionsVertical } from "react-icons/sl";
import Inbox from "../../Pages/Inbox";
import Archieve from "../../Pages/Archieve";
import Draft from "../../Pages/Draft";
import Sent from "../../Pages/Sent";
import Trash from "../../Pages/Trash";
import { useRouter } from "next/navigation";

export default function Inboxpage() {
  const divref = useRef<HTMLDivElement>(null);
  const myDivref = useRef<HTMLDivElement>(null);

  const [visible, setIsVisible] = useState<boolean>(true);
  const [compose, setCompose] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [inputvalue, setInputValue] = useState<string>("");
  const [subjectvalue, setSubjectValue] = useState<string>("");
  const [descriptionvalue, setDescriptionValue] = useState<string>("");
  const [selectedButtonId, setSelectedButtonId] = useState(1);

  const [loaddata, setLoadData] = useState<string | null>(null);
  const [archiveData, setArchiveData] = useState<string | null>(null);
  const [, setDeletedData] = useState<string | null>(null);
  const [trashData, setTrashData] = useState<string | null>(null);
  const [sentLength, setSentLength] = useState("0");
  const [draftLength, setDraftLength] = useState("0");
  const [getteddata, setGetteddata] = useState<string | null>("0");
  const [composeFp, setComposeFp] = useState<string>("");

  const [gettingmail, setGettingmail] = useState<string | null>(null);
  const [logout, setLogout] = useState<boolean>(false);

  const router = useRouter();

  interface Item {
    id: number;
    icon: React.ReactNode;
    title: string;
    value: string;
  }

  const sidebarcomponents: Item[] = [
    { id: 1, icon: <TbInbox />, title: "Inbox", value: "Inbox-button" },
    {
      id: 2,
      icon: <RiInboxArchiveLine />,
      title: "Archive",
      value: "Archive-button",
    },
    { id: 3, icon: <LuSendHorizontal />, title: "Sent", value: "Sent-button" },
    {
      id: 4,
      icon: <MdOutlineDrafts />,
      title: "Drafts",
      value: "Drafts-button",
    },
    { id: 5, icon: <IoTrashOutline />, title: "Trash", value: "Trash-button" },
  ];

  interface Button {
    id: number;
    label: React.ReactNode;
    value: string;
  }

  const buttonscontent: Button[] = [
    { id: 1, label: <Inbox />, value: "Inbox-button" },
    { id: 2, label: <Archieve />, value: "Archive-button" },
    { id: 3, label: <Sent />, value: "Sent-button" },
    { id: 4, label: <Draft />, value: "Drafts-button" },
    { id: 5, label: <Trash />, value: "Trash-button" },
  ];

  const togglesidebar = () => setIsVisible((prev) => !prev);

  const showcomposesection = () => setCompose(true);

  const hidecomposesection = () => {
    setCompose(false);
    setInputValue("");
    setDescriptionValue("");
    setSubjectValue("");
  };

  const closecomposesection = () => {
    const data = {
      receivername: inputvalue,
      subject: subjectvalue,
      description: descriptionvalue,
    };

    // if (typeof window !== "undefined") {
    const savedvalue = JSON.parse(localStorage.getItem("compose-data") || "[]");
    savedvalue.push(data);
    localStorage.setItem("compose-data", JSON.stringify(savedvalue));
    localStorage.setItem("sent-length", savedvalue.length.toString());

    const drafts = JSON.parse(localStorage.getItem("draft-data") || "[]");
    localStorage.setItem("draft-length", drafts.length.toString());

    localStorage.removeItem("compose-draft-title");
    localStorage.removeItem("compose-subject");
    localStorage.removeItem("compose-description");
    localStorage.removeItem("draft-email-compose");
    localStorage.setItem("draft-length-compose", "0");
    // }

    setInputValue("");
    setDescriptionValue("");
    setSubjectValue("");
    setCompose(false);
  };

  const handletitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    if (typeof window !== "undefined") {
      localStorage.setItem("compose-draft-title", event.target.value);
    }
  };

  const handlesubject = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSubjectValue(event.target.value);
    if (typeof window !== "undefined") {
      localStorage.setItem("compose-subject", event.target.value);
    }
  };

  const handledescription = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescriptionValue(event.target.value);
    if (typeof window !== "undefined") {
      localStorage.setItem("compose-description", event.target.value);
    }
  };

  const handleclickoutside = (event: MouseEvent) => {
    if (myDivref.current && !myDivref.current.contains(event.target as Node)) {
      setCompose(false);
    }
  };

  useEffect(() => {
    if (compose) {
      document.addEventListener("mousedown", handleclickoutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleclickoutside);
    };
  }, [compose]);

  const handleButtonClick = (id: number) => setSelectedButtonId(id);

  useEffect(() => {
    const updateStateFromStorage = () => {
      if (typeof window !== "undefined") {
        setLoadData(localStorage.getItem("Length-of-data"));
        setArchiveData(localStorage.getItem("Length-of-archive"));
        setDeletedData(localStorage.getItem("Deleted-item-length"));
        setTrashData(localStorage.getItem("Deleted-item-length"));
        setSentLength(localStorage.getItem("sent-length") || "0");
        setDraftLength(localStorage.getItem("draft-length") || "0");

        const title = localStorage.getItem("compose-draft-title") || "";
        const subj = localStorage.getItem("compose-subject") || "";
        const desc = localStorage.getItem("compose-description") || "";
        const to = localStorage.getItem("draft-email-compose") || "";
        const present = [title, subj, desc, to].some(
          (v) => v && v.trim() !== ""
        );
        // If there are no drafts, set getteddata to "0"
        const draftLengthValue = localStorage.getItem("draft-length") || "0";
        if (draftLengthValue === "0" && !present) {
          setGetteddata("0");
        } else {
          setGetteddata(present ? "1" : "0");
        }
        setComposeFp(`${title}|${subj}|${desc}|${to}`);
      }
    };

    updateStateFromStorage();
    const interval = setInterval(updateStateFromStorage, 500);

    window.addEventListener("drafts-updated", updateStateFromStorage);
    return () => {
      clearInterval(interval);
      window.removeEventListener("drafts-updated", updateStateFromStorage);
    };
  }, []);

  useEffect(() => {
    // if (typeof window !== "undefined") {
    if (inputvalue.trim() !== "") {
      localStorage.setItem("draft-email-compose", inputvalue);
      localStorage.setItem("draft-length-compose", "1");
    } else {
      localStorage.removeItem("draft-email-compose");
      localStorage.setItem("draft-length-compose", "0");
    }
    // }
  }, [inputvalue]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const usermail = localStorage.getItem("mail");
      if (!usermail) {
        router.push("/signup");
      } else {
        setGettingmail(usermail.charAt(0));
      }
    }
  }, [router]);

  const logoutgmail = () => setLogout(true);

  const removedatafromls = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("mail");
      window.location.reload();
    }
  };

  const hidediv = () => setLogout(false);

  const closedivonclickoutside = (event: MouseEvent) => {
    if (divref.current && !divref.current.contains(event.target as Node)) {
      setLogout(false);
    }
  };

  useEffect(() => {
    if (logout) {
      window.addEventListener("mousedown", closedivonclickoutside);
    }
    return () => {
      window.removeEventListener("mousedown", closedivonclickoutside);
    };
  }, [logout]);

  return (
    <>
      {logout && (
        <div className="fixed bg-[#0000008a] inset-0 z-10 justify-self-center w-full">
          <div
            ref={divref}
            className="bg-white justify-self-center self-center mt-50 px-4 w-[315px] sm:w-[400px] rounded-xl py-3"
          >
            <div className="pb-4 pt-1">
              <p className=" text-2xl pb-3 text-center font-medium text-gray-900">
                Logout confirmation
              </p>
              <h6 className="text-gray-600 text-center">
                Are you sure you want to logout?
              </h6>
            </div>
            <div className="flex flex-col pb-2">
              <button
                onClick={removedatafromls}
                className="bg-blue-600 w-full hover:bg-blue-700 cursor-pointer py-1.5 text-white rounded-md"
              >
                Yes!
              </button>
              <button
                onClick={hidediv}
                className="bg-gray-200 w-full mt-2 hover:bg-gray-300 cursor-pointer py-1.5 text-black font-semibold rounded-md"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {compose && (
        <div className="fixed bg-[#0000008a] z-50 w-full inset-0 bottom-0 justify-self-center">
          <div
            ref={myDivref}
            className="absolute left-4 md:left-auto md:fixed bg-white md:right-30 bottom-0 pb-4 w-[90%] rounded-md sm:w-[500px]"
          >
            <div className="flex justify-between py-1 items-center bg-[#f2f5fc] rounded-t-lg px-4 mb-4">
              <div className="text-sm font-semibold text-gray-600">
                New Message
              </div>
              <div className="flex gap-1 items-center">
                <p>
                  <MdCloseFullscreen />
                </p>
                <p
                  onClick={hidecomposesection}
                  className=" text-black w-full rounded-md text-center text-2xl items-center hover:scale-105 transition cursor-pointer"
                >
                  <IoIosClose />
                </p>
              </div>
            </div>
            <div className="flex flex-col w-full">
              <div className="flex flex-col gap-4 sm:gap-3 px-4">
                <div className="flex">
                  <input
                    value={inputvalue}
                    onChange={handletitle}
                    className="border-b border-gray-200 outline-0 placeholder:text-sm w-full"
                    type="text"
                    placeholder="To:"
                  />
                </div>
                <div className="flex flex-row">
                  <input
                    value={subjectvalue}
                    onChange={handlesubject}
                    className="border-b border-gray-200 outline-0 placeholder:text-sm w-full"
                    type="text"
                    placeholder="Subject"
                  />
                </div>
              </div>
              <div className="flex w-full flex-row px-4 pb-50">
                <input
                  value={descriptionvalue}
                  onChange={handledescription}
                  className="border-b border-gray-200 w-full mt-10 outline-0"
                  type="text"
                  placeholder="Description"
                />
              </div>
            </div>
            <div className="flex items-center justify-between mt-6 px-4">
              <div className="flex items-center gap-2 text-gray-700">
                <div className="bg-blue-600 flex items-center text-white hover:bg-blue-700 rounded-full px-2">
                  <p
                    onClick={closecomposesection}
                    className="font-medium text-white w-fit px-5 py-1.5 text-center cursor-pointer"
                  >
                    Send
                  </p>
                  <p>
                    <FaChevronDown />
                  </p>
                </div>
                <div className="hidden pl-2 md:flex gap-3">
                  <p className="text-lg hover:text-gray-900 cursor-pointer">
                    <MdFormatColorText />
                  </p>
                  <p className="text-lg hover:text-gray-900 cursor-pointer">
                    <IoAttach />
                  </p>
                  <p className="text-lg hover:text-gray-900 cursor-pointer">
                    <MdOutlineInsertEmoticon />
                  </p>
                  <p className="text-lg hover:text-gray-900 cursor-pointer">
                    <MdFormatColorText />
                  </p>
                  <p className="text-lg hover:text-gray-900 cursor-pointer">
                    <MdOutlineInsertPhoto />
                  </p>
                  <p className="text-lg hover:text-gray-900 cursor-pointer">
                    <FaGoogleDrive />
                  </p>
                </div>
              </div>
              <div className="cursor-pointer hover:text-gray-800">
                <SlOptionsVertical />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex justify-between px-4 sm:px-10 sm:pl-4 pt-3 pb-2 bg-[#f9fafe]">
        <div
          onClick={togglesidebar}
          className="flex items-center gap-2 cursor-pointer hover:scale-102 transition-200"
        >
          <Image
            src="assests/gmail.svg"
            width={36}
            height={40}
            alt="gmail-img"
          />
          <h5 className="text-[21px] font-medium text-gray-700">Gmail</h5>
        </div>
        <div className="hidden sm:inline h-fit pl-10 w-[55.5%] rounded-full bg-[#e9edf6]"></div>
        <div className="flex gap-4 items-center">
          <div className="flex flex-row gap-3">
            <p className="text-xl text-gray-500 hover:text-gray-600 cursor-pointer">
              <HiOutlineQuestionMarkCircle />
            </p>
            <p className="text-xl text-gray-500 hover:text-gray-600 cursor-pointer">
              <IoIosSettings />
            </p>
            <p className="text-xl text-gray-500 hover:text-gray-600 cursor-pointer">
              <SiGooglegemini />
            </p>
          </div>
          <div>
            <button
              onClick={logoutgmail}
              className="bg-blue-900 cursor-pointer hover:bg-blue-800 hover:scale-105 py-[3px] transition text-white px-2.5 rounded-full"
            >
              {gettingmail}
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex sm:flex-row">
        <div
          style={{ justifyContent: "start" }}
          className="w-full flex flex-col-reverse bg-[#f9fafe] sm:w-fit sm:h-[90vh]"
        >
          <div className="flex flex-col w-full sm:w-fit pb-2 sm:pb-0 gap-2 pr-4 pt-4">
            {sidebarcomponents.map((item: Item, index) => (
              <div
                style={{
                  backgroundColor:
                    selectedButtonId === item.id ? "#e5e7eb" : "",
                }}
                onClick={() => {
                  handleButtonClick(item.id);
                  setCurrentIndex(index);
                }}
                key={item.id}
                className="flex items-center justify-between cursor-pointer pl-7 pr-2 active:bg-blue-200 py-1.5 rounded-r-xl gap-6 hover:bg-gray-200"
              >
                <div className="flex gap-2">
                  <div className="text-xl">{item.icon}</div>
                  {visible && (
                    <p className="text-sm text-gray-500 w-40 font-semibold">
                      {item.title}
                    </p>
                  )}
                </div>
                <div>
                  {index === 0 && (
                    <p className="font-semibold pr-2">{loaddata || 0}</p>
                  )}
                  {index === 1 && (
                    <p className="font-semibold pr-2">{archiveData || 0}</p>
                  )}
                  {index === 2 && (
                    <p className="font-semibold pr-2">{sentLength || 0}</p>
                  )}
                  {index === 3 && (
                    <p className="font-semibold pr-2">
                      {Number(draftLength) === 0 && Number(getteddata) === 0
                        ? 0
                        : Number(draftLength) + Number(getteddata || 0)}
                    </p>
                  )}
                  {index === 4 && (
                    <p className="font-semibold pr-2">{trashData || 0}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="px-4 flex justify-self-center justify-center pt-4 w-full">
            <p
              onClick={showcomposesection}
              className="bg-[#c3e7ff] flex gap-2 items-center w-full px-3 py-3 cursor-pointer hover:bg-[#b2d4eb] hover:scale-101 transition rounded-xl"
            >
              <FaPen />
              {visible && (
                <span className="w-full font-semibold text-gray-500">
                  Compose
                </span>
              )}
            </p>
          </div>
        </div>
        <div className="w-full">
          <div className="w-full">
            {buttonscontent.map(
              (button: Button, index) =>
                index === currentIndex && (
                  <div
                    className="w-full"
                    key={
                      button.value === "Drafts-button"
                        ? `${button.id}-${draftLength}-${getteddata}-${composeFp}`
                        : `${button.id}`
                    }
                  >
                    <span className="w-full">{button.label}</span>
                  </div>
                )
            )}
          </div>
        </div>
      </div>
    </>
  );
}
