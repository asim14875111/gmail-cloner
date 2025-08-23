"use client";
import React, { useEffect, useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { FaArrowLeft } from "react-icons/fa";
import { RiInboxArchiveLine } from "react-icons/ri";
import { RiDeleteBin6Line } from "react-icons/ri";
import { HiOutlineChevronRight } from "react-icons/hi2";
import { VscChevronLeft } from "react-icons/vsc";
import { FaReplyAll } from "react-icons/fa";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import { GoUnread } from "react-icons/go";
// import { initialdata } from "../Components/initialdata";
// import { initialdata } from "@/Components/initialdata";
import { initialdata } from "@/Componets/initialdata";
// import Signup from "@/app/signup/page";
// // import MyContext from "../Componets/MyContext";
// import { MyContext } from "../Components/MyContext";
// import { createContext } from "vm";
// import unread from "./unreatd";

export default function Inbox() {
  // const initialdata = initialdata
  const [visible, setIsVisible] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [checkedItems, setCheckedItems] = useState<{ [key: number]: boolean }>(
    {}
  );
  const [searchItem, setSearchItem] = useState("");
  const [readItems, setReadItems] = useState<number[]>([]);
  const [display, setIsDisplay] = useState<boolean>(true);
  const [deletedisplay, setDeleteDisplay] = useState<boolean>(false);
  interface Item {
    id: number;
    title: string;
    description: string;
    delete: string;
    archive: string;
  }
  const [data, setData] = useState<Item[]>([]);
  const [inputvalue, setInputValue] = useState<string>("");
  const [unreadMails, SetUnreadMails] = useState<boolean>(false);
  const [allMails, setAllMails] = useState<boolean>(true);

  // const [length,setLength] = useState()/
  // const [isActive, setIsActive] = useState<boolean>(false);
  // console.log(data.length, "Length of data present in inbox section");
  // useEffect(() => {
  //   localStorage.setItem("length-of-data", JSON.stringify(data.length));
  // });
  // setLength(data.length)
  // console.log(length,"Length of inbox mails");

  useEffect(() => {
    if (!localStorage.getItem("MasterData")) {
      localStorage.setItem("MasterData", JSON.stringify(initialdata));
    }
  }, []);

  useEffect(() => {
    const read = JSON.parse(localStorage.getItem("read-item") || "[]");
    setReadItems(read.map((item: Item) => item.id));
  }, [data, data.length]);

  const [filterUsers, setFilteredUsers] = useState(initialdata);

  const loadData = (): void => {
    const master = JSON.parse(localStorage.getItem("MasterData") || "[]");
    const archived = JSON.parse(localStorage.getItem("Archived-item") || "[]");
    const deleted = JSON.parse(localStorage.getItem("Deleted-item") || "[]");

    const archivedIds = new Set(archived.map((i: Item) => i.id));
    const deletedIds = new Set(deleted.map((i: Item) => i.id));

    setData(
      master.filter(
        (i: Item) => !archivedIds.has(i.id) && !deletedIds.has(i.id)
      )
    );
  };

  // if (typeof window !== "undefined" ) {
  useEffect(() => {
    loadData();
  }, []);
  // }
  const setarchive = (item: Item) => {
    const getdata = JSON.parse(localStorage.getItem("Archived-item") || "[]");
    const exists = getdata.find((data: { id: number }) => data.id === item.id);
    if (!exists) {
      getdata.push({
        id: item.id,
        title: item.title,
        description: item.description,
      });
      localStorage.setItem("Archived-item", JSON.stringify(getdata));
    }
    // Do not remove from MasterData when archiving
    if (currentIndex === item.id) {
      setCurrentIndex(0);
      setIsVisible(false);
    }
  };

  const setdeleteditem = (item: Item): void => {
    const getdata = JSON.parse(localStorage.getItem("Deleted-item") || "[]");
    const exists = getdata.find((data: { id: number }) => data.id === item.id);

    if (!exists) {
      getdata.push({
        id: item.id,
        title: item.title,
        description: item.description,
      });
      localStorage.setItem("Deleted-item", JSON.stringify(getdata));
    }
    // Remove from MasterData when deleting
    const master = JSON.parse(localStorage.getItem("MasterData") || "[]");
    const updatedMaster = master.filter((d: Item) => d.id !== item.id);
    localStorage.setItem("MasterData", JSON.stringify(updatedMaster));

    setData((prev) => prev.filter((d) => d.id !== item.id));

    if (currentIndex === item.id) {
      setCurrentIndex(0);
      setIsVisible(false);
    }
  };

  interface Detail {
    id: number;
    subject: string;
    receiver: string;
    receivername: string;
    description: string;
    footer: string;
    founder: string;
    founderdetails: string;
  }

  const detailssection: Detail[] = [
    {
      id: 1,
      subject: "Microsoft account",
      receiver: "to me",
      receivername: "Hey John!",
      description:
        "We detected an unusual sign-in attempt on your Microsoft account.If this was you, you can safely ignore this email. Otherwise, we recommend changing your password immediately.Visit your account security page to review activity.— Microsoft Account Security",
      footer: "",
      founder: "microsoft.com",
      founderdetails: "CTO & Co Founder",
    },
    {
      id: 2,
      subject: "Vercel",
      receiver: "to me",
      receivername: "Hey sarah",
      description:
        "Your latest deployment to my-app has completed successfully and is now live.You can preview your deployment here: [vercel.app link]Environment: ProductionIf this was unexpected or you need to roll back, visit your Vercel dashboard.Thanks for deploying with Vercel!— The Vercel Team",
      footer: "",
      founder: "Vercel.com",
      founderdetails: "Click here to manage your notification settings",
    },
    {
      id: 3,
      subject: "Google",
      receiver: "to me",
      receivername: "Hey Ahmed",
      description:
        "We noticed a new sign-in to your Google Account from a device that we don't usually see.If this was you, no further action is needed. If not, we recommend securing your account immediately.You can review your recent activity in your Google Account settings.Thanks for helping us keep your account safe.— The Google Account Team",
      footer: "",
      founder: "google.com",
      founderdetails:
        "© 2025 Google LLC 1600 Amphitheatre Parkway, Mountain View, CA 94043",
    },
    {
      id: 4,
      subject: "iCloud",
      receiver: "to me",
      receivername: "Hey Oliver",
      description:
        "Your Apple ID was used to sign in to iCloud on a new device.Device: iPhone 15 ProLocation: New York, United StatesIf you recognize this activity, no action is needed. If not, we recommend changing your password immediately and reviewing your Apple ID account settings.— Apple Support",
      footer: "",
      founder: "icloud.com",
      founderdetails:
        "© 2025 Google LLC 1600 Amphitheatre Parkway, Mountain View, CA 94043",
    },
    {
      id: 5,
      subject: "GitHub",
      receiver: "to me",
      receivername: "Hey Kamran",
      description:
        "We detected a new sign-in to your GitHub account.Location: San Francisco, CA, United StatesDevice: Chrome on Windows 11If this was you, no action is needed. If not, we strongly recommend reviewing your account activity and changing your password.— The GitHub Security Team",
      footer: "",
      founder: "github.com",
      founderdetails:
        "GitHub, Inc. ・88 Colin P Kelly Jr Street ・San Francisco, CA 94107",
    },
    {
      id: 6,
      subject: "Postman",
      receiver: "to me",
      receivername: "Hey Haroon",
      description:
        "Hi john.api.dev,alex-postman has invited you to collaborate in the Postman workspace Team API Tools .This workspace contains shared collections, environments, and monitors.Click below to accept the invite and start collaborating.If you weren't expecting this invitation, you can ignore this email.— The PostmanTeam",
      footer: "",
      founder: "postman.com",
      founderdetails: "© 2024 Postman Inc. All Rights Reserved",
    },
    {
      id: 7,
      subject: "GitLab",
      receiver: "to me",
      receivername: "Hey Ayesha",
      description:
        "A new merge request has been created in the repository secure-auth-service.Opened by: sarah.codesBranch: fix/user-auth-bug → mainReview the changes and approve or request updates before it's merged.— GitLab",
      footer: "",
      founder: "gitlab.com",
      founderdetails: "You're receiving this email because of your account",
    },
    {
      id: 8,
      subject: "Quora Digest",
      receiver: "to me",
      receivername: "Hey Bilal",
      description:
        "Ayesha Malik just posted an answer to your question What are some underrated productivity hacks? She shared a few unconventional time-blocking strategies you might find helpful.Tap below to read the full answer and join the discussion.— Quora Digest",
      footer: "",
      founder: "quora.com",
      founderdetails:
        "Missing out on Quora emails? Be sure to add us to your primary inbox.",
    },
    {
      id: 9,
      subject: "Binance",
      receiver: "to me",
      receivername: "Hey John",
      description:
        "We've received a request to withdraw 0.025 BTC from your Binance account.To: bc1q9ke8xa...3d8tz (Bitcoin wallet)Request Time: August 7, 2025 – 09:47 AM UTCIf you did not initiate this, please cancel the request and secure your account immediately.— Binance Security Team",
      footer: "",
      founder: "binance.com",
      founderdetails: "© 2023 Binance.com, All Rights Reserved",
    },
    {
      id: 10,
      subject: "Snapchat",
      receiver: "to me",
      receivername: "Hey Sophia",
      description:
        "Your Snapchat account was just accessed from a new device.Device: iPhone 15Location: Miami, Florida, United StatesIf this was you, you're good to go. If not, please reset your password immediately to secure your account.— Team Snapchat",
      footer: "",
      founder: "Snapchat.com",
      founderdetails: "Snap Inc., 3000 31st Street, Santa Monica, CA 90405",
    },
  ];

  const showdetailssection = () => {
    setIsVisible(true);
    // setAllMails(false);
  };
  const hidedetailssection = () => {
    setIsVisible(false);
    // setAllMails(true);
  };

  const handleCheckboxChange = (id: number): void => {
    setCheckedItems((prev) => {
      const updated = { ...prev };
      if (updated[id]) {
        delete updated[id];
      } else {
        updated[id] = true;
      }
      return updated;
    });
  };

  const selectall = () => {
    if (Object.keys(checkedItems).length !== data.length) {
      const newChecked: { [key: number]: boolean } = {};
      data.forEach((item) => {
        newChecked[item.id] = true;
      });
      setCheckedItems(newChecked);
    } else {
      setCheckedItems({});
    }
  };

  useEffect(() => {
    setDeleteDisplay(Object.keys(checkedItems).length > 0);
  }, [checkedItems]);

  const deleteSelectedEmails = () => {
    const selectedIds = Object.keys(checkedItems)
      .filter((id) => checkedItems[Number(id)])
      .map(Number);

    const deletedItems = JSON.parse(
      localStorage.getItem("Deleted-item") || "[]"
    );
    const updatedDeleted = [
      ...deletedItems,
      ...data.filter((item) => selectedIds.includes(item.id)),
    ];
    localStorage.setItem("Deleted-item", JSON.stringify(updatedDeleted));
    localStorage.setItem(
      "Deleted-item-length",
      JSON.stringify(updatedDeleted.length)
    );

    setData((prev) => prev.filter((item) => !selectedIds.includes(item.id)));
    setCheckedItems({});
    setFilteredUsers((prev) =>
      prev.filter((item) => !selectedIds.includes(item.id))
    );
    setCheckedItems({});
  };
  const readSelectedEmails = () => {
    const selectedIds = Object.keys(checkedItems)
      .filter((id) => checkedItems[Number(id)])
      .map(Number);

    const readItemsFromLS = JSON.parse(
      localStorage.getItem("read-item") || "[]"
    );
    const updatedRead = [
      ...readItemsFromLS,
      ...data.filter((item) => selectedIds.includes(item.id)),
    ];

    localStorage.setItem("read-item", JSON.stringify(updatedRead));

    setReadItems((prev) => [...new Set([...prev, ...selectedIds])]);
    setCheckedItems({});
  };
  const removeselectedmails = () => {
    const selectedIds = Object.keys(checkedItems)
      .filter((id) => checkedItems[Number(id)])
      .map(Number);

    const readItemsFromLS = JSON.parse(
      localStorage.getItem("read-item") || "[]"
    );
    const updatedRead = readItemsFromLS.filter(
      (item: Item) => !selectedIds.includes(item.id)
    );
    localStorage.setItem("read-item", JSON.stringify(updatedRead));
    setReadItems(updatedRead.map((item: Item) => item.id));
    setCheckedItems({});
  };

  const archiveAllEmails = (): void => {
    const selectedIds = Object.keys(checkedItems)
      .filter((id) => checkedItems[Number(id)])
      .map(Number);

    const archivedItems = JSON.parse(
      localStorage.getItem("Archived-item") || "[]"
    );
    const updatedArchived = [
      ...archivedItems,
      ...data.filter((item) => selectedIds.includes(item.id)),
    ];
    localStorage.setItem("Archived-item", JSON.stringify(updatedArchived));
    localStorage.setItem(
      "Length-of-archive",
      updatedArchived.length.toString()
    );

    setData((prev) => prev.filter((item) => !selectedIds.includes(item.id)));
    setCheckedItems({});
    setFilteredUsers((prev) =>
      prev.filter((item) => !selectedIds.includes(item.id))
    );
    setCheckedItems({});
  };

  useEffect(() => {
    const savedValue = localStorage.getItem("draft-email");
    if (savedValue) {
      setInputValue(savedValue);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("draft-email", inputvalue);
  }, [inputvalue]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    subject: string,
    founder: string
  ): void => {
    setInputValue(event.target.value);
    console.log(subject, "subject of input ");

    localStorage.setItem("title-subject", JSON.stringify(subject));
    localStorage.setItem("draft-founder", JSON.stringify(founder));
  };

  const savesentmails = (subject: string, founder: string): void => {
    console.log(founder, "----Founder name");

    const foundername = JSON.parse(localStorage.getItem("founder") || "[]");
    if (foundername) {
      foundername.push(founder);
    }
    localStorage.setItem("founder", JSON.stringify(foundername));

    const title = JSON.parse(localStorage.getItem("title") || "[]");
    if (title) {
      title.push(subject);
    }
    localStorage.setItem("title", JSON.stringify(title));

    const sentvalue = JSON.parse(localStorage.getItem("Sent-value") || "[]");
    if (sentvalue) {
      sentvalue.push(inputvalue);
    }
    localStorage.setItem("length-of-sent-mails", sentvalue.length);
    localStorage.setItem("Sent-value", JSON.stringify(sentvalue));
    setInputValue("");

    localStorage.removeItem("title-subject");
    localStorage.removeItem("draft-founder");
  };

  const showunreadmails = () => {
    SetUnreadMails(true);
    // setIsActive(true);
    setAllMails(false);
  };
  const showallmails = () => {
    // setIsActive(true);
    SetUnreadMails(!true);
    setAllMails(true);
  };

  useEffect(() => {
    const unreadCount = data.filter(
      (item) => !readItems.includes(item.id)
    ).length;
    localStorage.setItem("Length-of-data", unreadCount.toString());
  }, [data, readItems]);

  useEffect(() => {
    localStorage.setItem("archive-length", data.length.toString());
  }, []);

  useEffect(() => {
    if (inputvalue.trim() !== "") {
      localStorage.setItem("draft-email", inputvalue);
      localStorage.setItem("draft-length", "1");
    } else {
      localStorage.removeItem("draft-email");
      localStorage.setItem("draft-length", "0");
    }
  }, [inputvalue]);

  const markAsRead = (id: number) => {
    const readItemsFromLS = JSON.parse(
      localStorage.getItem("read-item") || "[]"
    );

    const exists = readItemsFromLS.find((item: Item) => item.id === id);
    if (!exists) {
      const currentItem = data.find((item) => item.id === id);
      if (currentItem) {
        readItemsFromLS.push(currentItem);
        localStorage.setItem("read-item", JSON.stringify(readItemsFromLS));
      }
    }

    setReadItems((prev) => [...new Set([...prev, id])]);
  };

  const handleinputchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    setSearchItem(searchTerm);

    const filteredItems = data.filter((user) =>
      user.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filteredItems);
  };
  useEffect(() => {
    setFilteredUsers(data);
  }, [data]);

  // const resetInboxForNewUser = () => {
  //   localStorage.setItem("MasterData", JSON.stringify(initialata));
  //   localStorage.removeItem("Deleted-item");
  //   localStorage.removeItem("Archived-item");
  //   localStorage.removeItem("read-item");
  //   loadData();
  // };

  return (
    <div>
      {/* <MyContext.Provider value={{  }}>
        <p className="hidden">
          <Signup />
        </p> */}
      {/* <p className="hidden"> */}
      {/* <button onClick={resetInboxForNewUser}>Reset</button> */}
      {/* <Signup resetInboxForNewUser={resetInboxForNewUser}/> */}
      {/* </p> */}
      <div className=" flex flex-row px-1 sm:px-5 items-center bg-gray-100 border-t border-b py-2 border-gray-200 w-full justify-between">
        <div className="flex items-center gap-4">
          <input
            onClick={selectall}
            checked={
              Object.keys(checkedItems).length === data.length &&
              data.length > 0
            }
            className="cursor-pointer w-5 h-4"
            type="checkbox"
          />
          <div className="flex flex-col  gap-2 sm:px-2 text-black items-center pr-2 pl-0 sm:flex sm:flex-row ">
            {deletedisplay && (
              <div
                onClick={readSelectedEmails}
                className="cursor-pointer text-xl"
              >
                <MdOutlineMarkEmailRead />
              </div>
            )}
            {deletedisplay && (
              <button className="cursor-pointer" onClick={removeselectedmails}>
                <GoUnread />
              </button>
            )}
          </div>
        </div>
        <div className="bg-[#e9edf6] w-[80%] rounded-full">
          <input
            value={searchItem}
            onChange={handleinputchange}
            type="text"
            className="border-none outline-0 pl-6 py-2 placeholder:text-gray-900 text-black"
            placeholder="search mail"
          />
        </div>
        <div className="flex gap-2">
          <button onClick={showallmails} className="">
            {/* All */}
          </button>
          <button onClick={showunreadmails} className="">
            {/* Unread */}
          </button>

          {deletedisplay && (
            <div className="flex flex-col sm:flex sm:flex-row-reverse text-black gap-2 items-center">
              <div
                onClick={deleteSelectedEmails}
                className="text-gray-600 cursor-pointer hover:scale-105 transition text-lg"
              >
                <RiDeleteBin6Line />
              </div>
              <div
                onClick={archiveAllEmails}
                className="text-lg cursor-pointer hover:scale-105 transition"
              >
                <RiInboxArchiveLine />
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col">
        {unreadMails && (
          <div>
            <p className="absolute pl-5 pt-2">Unread</p>
            <div className="w-full flex flex-row mt-6">
              {display && data.length > 0 ? (
                <div className="w-full h-[83vh] flex flex-col gap-4 px-4 py-4 overflow-auto border-r   border-gray-300">
                  {filterUsers.map((item: Item) => (
                    <div
                      onClick={() => {
                        setCurrentIndex(item.id);
                        showdetailssection();
                        markAsRead(item.id);
                      }}
                      className={`flex flex-row items-start hover:bg-gray-100 cursor-pointer gap-4 justify-start rounded-xl bg-gray-50 p-2 border border-gray-200 ${
                        readItems.includes(item.id) ? "bg-gray-200" : "  "
                      } `}
                      key={item.id}
                    >
                      <input
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        checked={!!checkedItems[item.id]}
                        onChange={() => handleCheckboxChange(item.id)}
                        className="cursor-pointer mt-2"
                        type="checkbox"
                      />
                      <div className="flex flex-col items-start">
                        <h5 className="font-semibold">{item.title}</h5>
                        <p className="text-gray-500 text-sm    text-start line-clamp-1  ">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-gray-500 justify-center text-center mt-10 w-full justify-self-center">
                  <p className="text-center">Inbox is empty</p>
                </div>
              )}
              {visible && (
                <div className=" flex w-[130%] pr-0 flex-col">
                  <div className="flex justify-between items-center px-2 py-3 border-gray-300 border-t border-b bg-gray-50 w-[100%]">
                    <div className="flex items-center">
                      <p
                        onClick={hidedetailssection}
                        className="text-sm cursor-pointer hover:scale-104 text-black   transition"
                      >
                        <FaArrowLeft />
                      </p>
                      <div className="flex items-center gap-2 pl-6 border-r pr-2 border-gray-400">
                        <p
                          className="pt-[1px] text-lg cursor-pointer hover:scale-102   transition"
                          onClick={() => {
                            const currentItem = data.find(
                              (item) => item.id === currentIndex
                            );
                            if (currentItem) {
                              setarchive(currentItem);
                              hidedetailssection();
                            }
                          }}
                        >
                          <RiInboxArchiveLine />
                        </p>
                        <p
                          className="text-[17px] cursor-pointer hover:scale-102 transition"
                          onClick={() => {
                            const currentItem = data.find(
                              (item) => item.id === currentIndex
                            );
                            if (currentItem) {
                              setdeleteditem(currentItem);
                              hidedetailssection();
                            }
                          }}
                        >
                          <RiDeleteBin6Line />
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <p className="text-gray-600">
                        <VscChevronLeft />
                      </p>
                      <p className="text-gray-600">
                        <HiOutlineChevronRight />
                      </p>
                    </div>
                  </div>

                  <div className="justify-self-start pt-6 text-start pl-4 w-[100%] pr-2 pb-3">
                    {detailssection.map(
                      (item: Detail) =>
                        item.id === currentIndex && (
                          <div key={item.id}>
                            <div className="flex flex-col justify-between h-[74vh]">
                              <div>
                                <div>
                                  <p className="text-2xl font-semibold">
                                    {item.subject}
                                  </p>
                                  <p className="text-sm flex pb-4 items-center text-gray-500">
                                    {item.receiver}{" "}
                                    <span className="text-lg">
                                      <IoMdArrowDropdown />
                                    </span>{" "}
                                  </p>
                                  <p className="pb-6 pt-2">
                                    {item.receivername}
                                  </p>
                                  <p className="text-[#222] text-sm">
                                    {item.description}
                                  </p>
                                </div>
                                <div className="pt-10">
                                  <p className="text-sm text-[#222]">
                                    {item.footer}
                                  </p>
                                  <p className="text-sm pt-1 text-blue-600 cursor-pointer underline">
                                    {item.founder}
                                  </p>
                                  <p className="text-[15px] pt-1 text-[#222]">
                                    {item.founderdetails}
                                  </p>
                                </div>
                              </div>
                              <div>
                                <p className="pb-2 flex items-center gap-1 text-gray-600 font-semibold">
                                  Reply{" "}
                                  <span>
                                    <FaReplyAll />
                                  </span>{" "}
                                </p>
                                <div className="flex border py-1 pr-1 rounded-full">
                                  <input
                                    value={inputvalue}
                                    onChange={(e) =>
                                      handleChange(
                                        e,
                                        item.subject,
                                        item.founder
                                      )
                                    }
                                    className="border-0 pl-4 outline-none w-full"
                                    type="text"
                                  />
                                  <p
                                    onClick={() =>
                                      savesentmails(item.subject, item.founder)
                                    }
                                    className="bg-black hover:bg-gray-900 cursor-pointer rounded-full px-4 py-1 text-white"
                                  >
                                    Send
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {allMails && (
          <div className="w-full flex flex-row">
            {display && data.length > 0 ? (
              <div className="w-full h-[83vh] flex flex-col gap-4 px-4 py-4 overflow-auto border-r bg-white border-gray-300">
                {filterUsers.map((item: Item) => (
                  <div
                    onClick={() => {
                      setCurrentIndex(item.id);
                      showdetailssection();
                      markAsRead(item.id);
                    }}
                    className={`flex flex-row items-start hover:bg-gray-100 cursor-pointer gap-4 justify-start rounded-xl bg-gray-50 p-2 border border-gray-200 ${
                      readItems.includes(item.id) ? "bg-gray-200" : ""
                    }`}
                    key={item.id}
                  >
                    <input
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      checked={!!checkedItems[item.id]}
                      onChange={() => handleCheckboxChange(item.id)}
                      className="cursor-pointer mt-1"
                      type="checkbox"
                    />
                    <div className="flex flex-col items-start">
                      <h5 className="font-semibold text-black">{item.title}</h5>
                      <p className="text-gray-500 text-sm    text-start line-clamp-1  ">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-gray-500 justify-center mt-10 w-full justify-self-center">
                <p className="text-center self-center">Inbox is empty</p>
              </div>
            )}
            {visible && (
              <div className="absolute   bg-white flex w-fit m  pr-0 flex-col">
                <div className="flex justify-between items-center px-2 py-3 border-gray-300 text-black border-t border-b bg-gray-50 w-[100%]">
                  <div className="flex items-center">
                    <p
                      onClick={hidedetailssection}
                      className="text-sm cursor-pointer hover:scale-104 transition"
                    >
                      <FaArrowLeft />
                    </p>
                    <div className="flex items-center gap-2 pl-6 border-r pr-2 border-gray-400">
                      {/* <p
                        className="pt-[1px] text-lg cursor-pointer hover:scale-102 transition"
                        onClick={() => {
                          const currentItem = data.find(
                            (item) => item.id === currentIndex
                            );
                          if (currentItem) {
                            setarchive(currentItem);
                            hidedetailssection();
                          }
                          }}
                          >
                          <RiInboxArchiveLine />
                          </p>
                          <p
                        className="text-[17px] cursor-pointer hover:scale-102 transition"
                        onClick={() => {
                          const currentItem = data.find(
                            (item) => item.id === currentIndex
                          );
                          if (currentItem) {
                            setdeleteditem(currentItem);
                            hidedetailssection();
                          }
                        }}
                      >
                        <RiDeleteBin6Line />
                      </p> */}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <p className="text-gray-600">
                      <VscChevronLeft />
                    </p>
                    <p className="text-gray-600">
                      <HiOutlineChevronRight />
                    </p>
                  </div>
                </div>

                <div className="justify-self-start pt-6 text-start pl-4 w-[100%] pr-2 pb-3">
                  {detailssection.map(
                    (item: Detail) =>
                      item.id === currentIndex && (
                        <div key={item.id}>
                          <div className="flex flex-col justify-between h-[71vh]">
                            {" "}
                            <div>
                              <div>
                                <p className="text-2xl font-semibold text-black">
                                  {item.subject}
                                </p>
                                <p className="text-sm flex pb-4 items-center text-gray-500">
                                  {item.receiver}{" "}
                                  <span className="text-lg">
                                    <IoMdArrowDropdown />
                                  </span>{" "}
                                </p>
                                <p className="pb-6 pt-2 text-black">
                                  {item.receivername}
                                </p>
                                <p className="text-[#222] text-sm">
                                  {item.description}
                                </p>
                              </div>
                              <div className="pt-10">
                                <p className="text-sm text-[#222]">
                                  {item.footer}
                                </p>
                                <p className="text-sm pt-1 text-blue-600 cursor-pointer underline">
                                  {item.founder}
                                </p>
                                <p className="text-[15px] pt-1 text-[#222]">
                                  {item.founderdetails}
                                </p>
                              </div>
                            </div>
                            <div>
                              <p className="pb-2 flex items-center gap-1 text-gray-600 font-semibold">
                                Reply{" "}
                                <span>
                                  <FaReplyAll />
                                </span>{" "}
                              </p>
                              <div className="flex border border-black py-1 pr-1 rounded-full">
                                <input
                                  value={inputvalue}
                                  onChange={(e) =>
                                    handleChange(e, item.subject, item.founder)
                                  }
                                  className="border-0 pl-4 outline-none  w-full"
                                  type="text"
                                />
                                <p
                                  onClick={() =>
                                    savesentmails(item.subject, item.founder)
                                  }
                                  className="bg-black hover:bg-gray-900 cursor-pointer rounded-full px-4 py-1 text-white"
                                >
                                  Send
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      {/* </MyContext.Provider> */}
    </div>
  );
}
