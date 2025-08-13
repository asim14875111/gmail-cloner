"use client";
import React, { useEffect, useRef } from "react";
import { TbInbox } from "react-icons/tb";
import { LuSendHorizontal } from "react-icons/lu";
import { MdOutlineDrafts } from "react-icons/md";
import { FaPen } from "react-icons/fa6";
import Image from "next/image";
import { HiOutlineQuestionMarkCircle } from "react-icons/hi";
import { IoIosSettings } from "react-icons/io";
import { SiGooglegemini } from "react-icons/si";
import { MdAccountCircle } from "react-icons/md";
import { IoTrashOutline } from "react-icons/io5";
import { RiInboxArchiveLine } from "react-icons/ri";
import Inbox from "../Pages/Inbox";
import Archieve from "../Pages/Archieve";
import Draft from "../Pages/Draft";
import Sent from "../Pages/Sent";
import Trash from "../Pages/Trash";
import { useState } from "react";
export default function Inboxpage() {
  const [visible, setIsVisible] = useState<boolean>(!false);
  const [display] = React.useState<boolean>(!false);
  const [compose, setCompose] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [inputvalue, setInputValue] = useState<string>("");
  const [subjectvalue, setSubjectValue] = useState<string>("");
  const myDivref = useRef<HTMLDivElement>(null);
  const [descriptionvalue, setDescriptionValue] = useState<string>("");
  interface Item {
    id: number;
    icon: React.ReactNode;
    title: string;
    value: string;
  }
  const sidebarcomponents: Item[] = [
    {
      id: 1,
      icon: <TbInbox />,
      title: "Inbox",
      value: "Inbox-button",
    },
    {
      id: 2,
      icon: <RiInboxArchiveLine />,
      title: "Archive",
      value: "Archive-button",
    },

    {
      id: 3,
      icon: <LuSendHorizontal />,
      title: "Sent",
      value: "Sent-button",
    },
    {
      id: 4,
      icon: <MdOutlineDrafts />,
      title: "Drafts",
      value: "Drafts-button",
    },

    {
      id: 5,
      icon: <IoTrashOutline />,
      title: "Trash",
      value: "Trash-button",
    },
  ];

  const togglesidebar = () => {
    if (visible === true) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  };
  interface Button {
    id: number;
    label: React.ReactNode;
    value: string;
  }
  const buttonscontent: Button[] = [
    {
      id: 1,
      label: <Inbox />,
      value: "Inbox-button",
    },
    {
      id: 2,
      label: <Archieve />,
      value: "Archive-button",
    },
    {
      id: 3,
      label: <Sent />,
      value: "Sent-button",
    },
    {
      id: 4,
      label: <Draft />,
      value: "Drafts-button",
    },

    {
      id: 5,
      label: <Trash />,
      value: "Trash-button",
    },
  ];

  const showcomposesection = () => {
    setCompose(true);
  };

  const hidecomposesection = () => {
    setCompose(false);
  };
  const closecomposesection = () => {
    setCompose(false);
  };

  const handletitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);

    localStorage.setItem("compose-draft-title", inputvalue);
    console.log(event.target.value, "Compose draft title");
  };
  const handlesubject = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSubjectValue(event.target.value);
    localStorage.setItem("compose-subject", subjectvalue);

    console.log(event.target.value, "Compose draft subject");
  };
  const handledescription = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescriptionValue(event.target.value);
    localStorage.setItem("compose-description", descriptionvalue);

    console.log(event.target.value, "Compose draft description");
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

  return (
    <>
      {compose && (
        <div className="fixed bg-[#0000008a] w-full inset-0 justify-self-center">
          <div ref={myDivref} className="fixed top-65 bg-white justify-self-center items-center self-center  px-4 py-4 pt- rounded-md w-fit">
            <div className="flex flex-col w-full">
              <div className="flex gap-2">
                <div className="flex flex-row">
                  {" "}
                  <input
                    value={inputvalue}
                    onChange={handletitle}
                    className="border-b  outline-0"
                    type="text"
                    placeholder="To:"
                  />
                </div>
                <div className="flex flex-row">
                  <input
                    value={subjectvalue}
                    onChange={handlesubject}
                    className="border-b  outline-0"
                    type="text"
                    placeholder="Subject"
                  />
                </div>
              </div>
              <div className="flex w-full flex-row">
                <input
                  value={descriptionvalue}
                  onChange={handledescription}
                  className="border-b w-full mt-10 outline-0"
                  type="text"
                  placeholder="Description"
                />
              </div>
            </div>
            <div className="flex gap-2 mt-6">
              <p
                onClick={closecomposesection}
                className="bg-black text-white w-full px-2 rounded-md hover:bg-gray-900 py-2 text-center
               cursor-pointer"
              >
                Send
              </p>

              <p
                onClick={hidecomposesection}
                className="bg-red-500 text-white w-full px-2 rounded-md text-center py-2 items-center hover:bg-red-600 cursor-pointer "
              >
                Close
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between px-10 py-3 bg-[#f9fafe]">
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
            <p className="text-blue-900 text-4xl cursor-pointer hover:text-blue-800 hover:scale-102 transition">
              <MdAccountCircle />
            </p>
          </div>
        </div>
      </div>

      <div className="flex">
        <div className=" bg-[#f9fafe] w-fit h-[90vh]">
          <div className="flex flex-col w-fit  gap-2 pr-4 pt-4 ">
            {sidebarcomponents.map((item: Item, index) => (
              <div
                onClick={() => setCurrentIndex(index)}
                key={item.id}
                className="flex items-center cursor-pointer pl-7 pr-2  active:bg-blue-200 py-1.5  rounded-r-xl gap-6 hover:bg-gray-200"
              >
                <div className="text-xl">{item.icon}</div>
                {visible && (
                  <p
                    id=""
                    className="text-sm text-gray-500  w-40 font-semibold"
                  >
                    {item.title}
                  </p>
                )}
              </div>
            ))}
          </div>
          <div className="px-4 flex justify-self-center justify-center pt-4 w-full">
            <p className="bg-[#c3e7ff] flex gap-2 items-center w-full px-3 py-3 cursor-pointer hover:bg-[#b2d4eb] hover:scale-101 transition rounded-xl">
              <FaPen />
              {visible && (
                <span onClick={showcomposesection} className="w-full">
                  Compose
                </span>
              )}
            </p>
          </div>
        </div>
        <div className="w-full">
          {display && (
            <div className="w-full">
              {buttonscontent.map(
                (button: Button, index) =>
                  index === currentIndex && (
                    <div className="w-full" key={button.id}>
                      <button className="w-full">{button.label}</button>
                    </div>
                  )
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
