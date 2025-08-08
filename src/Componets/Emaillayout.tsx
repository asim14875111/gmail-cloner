"use client";
import React from "react";
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
import Inbox from "./Pages/Inbox";
import Archieve from "./Pages/Archieve";
import Draft from "./Pages/Draft";
import Sent from "./Pages/Sent";
import Trash from "./Pages/Trash";
import { useState } from "react";
export default function Inboxpage() {
  const [visible, setIsVisible] = useState<boolean>(!false);
  const [display] = React.useState<boolean>(!false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
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

  return (
    <>
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
              {visible && <span className="w-full">Compose</span>}
            </p>
          </div>
        </div>
        <div className="w-fit">
          {display && (
            <div className="w-fit">
              {buttonscontent.map(
                (button: Button, index) =>
                  index === currentIndex && (
                    <div className="w-fit" key={button.id}>
                      <button className="w-fit">{button.label}</button>
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
