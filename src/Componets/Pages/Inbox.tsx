"use client";
import { useEffect, useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { FaArrowLeft } from "react-icons/fa";
import { RiInboxArchiveLine } from "react-icons/ri";
import { RiDeleteBin6Line } from "react-icons/ri";
import { HiOutlineChevronRight } from "react-icons/hi2";
import { VscChevronLeft } from "react-icons/vsc";
import { FaReplyAll } from "react-icons/fa";
export default function Inbox() {
  const [visible, setIsVisible] = useState<boolean>(false);
  const [currentIndex, setCurretnIndex] = useState<number>(0);

  interface Item {
    id: number;
    title: string;
    description: string;
    delete: React.ReactNode;
    archive: string;
  }

  const initialData: Item[] = [
    {
      id: 1,
      title: "Microsoft account t.",
      description:
        "Hi,We detected an unusual sign-in attempt on your Microsoft account.If this was you, you can safely ignore this email. Otherwise, we recommend changing your password immediately.Visit your account security page to review activity.— Microsoft Account Security",
      delete: "Delete",
      archive: "Archive",
    },
    {
      id: 2,
      title: "Vercel",
      description:
        "Hey user,Your latest deployment to my-app has completed successfully and is now live.You can preview your deployment here: [vercel.app link]Environment: ProductionIf this was unexpected or you need to roll back, visit your Vercel dashboard.Thanks for deploying with Vercel!— The Vercel Team.",
      delete: "Delete",
      archive: "Archive",
    },
    {
      id: 3,
      title: "Google",
      description:
        "Hi there,We noticed a new sign-in to your Google Account from a device that we don’t usually see.If this was you, no further action is needed. If not, we recommend securing your account immediately.You can review your recent activity in your Google Account settings.Thanks for helping us keep your account safe.— The Google Account Team",
      delete: "Delete",
      archive: "Archive",
    },
    {
      id: 4,
      title: "iCloud",
      description:
        "Dear john,Your Apple ID was used to sign in to iCloud on a new device.Device: iPhone 15 ProLocation: New York, United StatesIf you recognize this activity, no action is needed. If not, we recommend changing your password immediately and reviewing your Apple ID account settings.— Apple Support",
      delete: "Delete",
      archive: "Archive",
    },
    {
      id: 5,
      title: "Github",
      description:
        "Hi johndev47,We detected a new sign-in to your GitHub account.Location: San Francisco, CA, United StatesDevice: Chrome on Windows 11If this was you, no action is needed. If not, we strongly recommend reviewing your account activity and changing your password.— The GitHub Security Team",
      delete: "Delete",
      archive: "Archive",
    },
    {
      id: 6,
      title: "The Postman team",
      description:
        "Hi john.api.dev,alex-postman has invited you to collaborate in the Postman workspace Team API Tools .This workspace contains shared collections, environments, and monitors.Click below to accept the invite and start collaborating.If you weren't expecting this invitation, you can ignore this email.— The PostmanTeam",
      delete: "Delete",
      archive: "Archive",
    },
    {
      id: 7,
      title: "GitLab.",
      description:
        "Hi johndev47,A new merge request has been created in the repository secure-auth-service.Opened by: sarah.codesBranch: fix/user-auth-bug → mainReview the changes and approve or request updates before it’s merged.— GitLab",
      delete: "Delete",
      archive: "Archive",
    },
    {
      id: 8,
      title: "Quora Digest",
      description:
        "Hi john.quora92,Ayesha Malik just posted an answer to your question:“What are some underrated productivity hacks?”She shared a few unconventional time-blocking strategies you might find helpful.Tap below to read the full answer and join the discussion.— Quora Digest",
      delete: "Delete",
      archive: "Archive",
    },
    {
      id: 9,
      title: "Binance",
      description:
        "Hi michael.trades24,We’ve received a request to withdraw 0.025 BTC from your Binance account.To: bc1q9ke8xa...3d8tz (Bitcoin wallet)Request Time: August 7, 2025 – 09:47 AM UTCIf you did not initiate this, please cancel the request and secure your account immediately.— Binance Security Team",
      delete: "Delete",
      archive: "Archive",
    },
    {
      id: 10,
      title: "Snapchat",
      description:
        "Hi mike.snapx,Your Snapchat account was just accessed from a new device.Device: iPhone 15Location: Miami, Florida, United StatesIf this was you, you’re good to go. If not, please reset your password immediately to secure your account.— Team Snapchat",
      delete: "Delete",
      archive: "Archive",
    },
  ];

  const [data, setData] = useState<Item[]>([]);

  useEffect(() => {
    const archived = JSON.parse(localStorage.getItem("Data") || "[]");
    const deleted = JSON.parse(localStorage.getItem("Deleted-item") || "[]");
    const archivedIds = new Set(archived.map((i: Item) => i.id));
    const deletedIds = new Set(deleted.map((i: Item) => i.id));

    setData(
      initialData.filter((i) => !archivedIds.has(i.id) && !deletedIds.has(i.id))
    );
  }, []);

  const setarchive = (item: Item) => {
    const getdata = JSON.parse(localStorage.getItem("Data") || "[]");
    const exists = getdata.find((data: { id: number }) => data.id === item.id);
    if (!exists)
      getdata.push({
        id: item.id,
        title: item.title,
        description: item.description,
      });
    localStorage.setItem("Data", JSON.stringify(getdata));
    setData((prev) => prev.filter((d) => d.id !== item.id));
  };

  const setdeleteditem = (item: Item) => {
    const getdata = JSON.parse(localStorage.getItem("Deleted-item") || "[]");
    const exists = getdata.find((data: { id: number }) => data.id === item.id);
    if (!exists)
      getdata.push({
        id: item.id,
        title: item.title,
        description: item.description,
      });
    localStorage.setItem("Deleted-item", JSON.stringify(getdata));
    setData((prev) => prev.filter((d) => d.id !== item.id));

    if (currentIndex === item.id) {
      console.log("Id is not equal");
      setCurretnIndex(0);
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
      founder: "Braden Sidoti",
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
        "We noticed a new sign-in to your Google Account from a device that we don’t usually see.If this was you, no further action is needed. If not, we recommend securing your account immediately.You can review your recent activity in your Google Account settings.Thanks for helping us keep your account safe.— The Google Account Team",
      footer: "",
      founder: "https://myaccount.google.com/notifications",
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
      founder: " upgrade to iCloud+",
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
      founder: "Sign in to GitHub",
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
      founder:
        "55 2nd Street, Suite 300, San Francisco, CA 94105, +1 415 796 6470",
      founderdetails: "© 2024 Postman Inc. All Rights Reserved",
    },
    {
      id: 7,
      subject: "GitLab",
      receiver: "to me",
      receivername: "Hey Ayesha",
      description:
        "A new merge request has been created in the repository secure-auth-service.Opened by: sarah.codesBranch: fix/user-auth-bug → mainReview the changes and approve or request updates before it’s merged.— GitLab",
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
        "Ayesha Malik just posted an answer to your question:“What are some underrated productivity hacks?”She shared a few unconventional time-blocking strategies you might find helpful.Tap below to read the full answer and join the discussion.— Quora Digest",
      footer: "",
      founder: "https://www.quora.com",
      founderdetails:
        "Missing out on Quora emails? Be sure to add us to your primary inbox.",
    },
    {
      id: 9,
      subject: "Binance",
      receiver: "to me",
      receivername: "Hey John",
      description:
        "We’ve received a request to withdraw 0.025 BTC from your Binance account.To: bc1q9ke8xa...3d8tz (Bitcoin wallet)Request Time: August 7, 2025 – 09:47 AM UTCIf you did not initiate this, please cancel the request and secure your account immediately.— Binance Security Team",
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
        "Your Snapchat account was just accessed from a new device.Device: iPhone 15Location: Miami, Florida, United StatesIf this was you, you’re good to go. If not, please reset your password immediately to secure your account.— Team Snapchat",
      footer: "",
      founder: "Snapchat.com",
      founderdetails: "Snap Inc., 3000 31st Street, Santa Monica, CA 90405",
    },
  ];

  const showdetailssection = () => {
    setIsVisible(true);
  };
  const hidedetailssection = () => {
    setIsVisible(false);
  };



  return (
    <div className="w-full flex flex-row">
      <div className="w-[37%] h-[90vh] overflow-auto border-r border-gray-300">
        {data.map((item: Item) => (
          <div
            onClick={() => {
              setCurretnIndex(item.id);
              showdetailssection();
            }}
            className="flex flex-row items-center  hover:bg-gray-50 cursor-pointer gap-10 justify-between rounded-b-xl  p-4 border-b border-gray-200"
            key={item.id}
          >
            <div className="flex flex-col items-start">
              <h5 className="font-semibold">{item.title}</h5>
              <p className="text-gray-500 text-sm pt-1 text-start line-clamp-2">
                {item.description}
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <p
                className="cursor-pointer text-white text-sm font-medium bg-black px-4 py-1 rounded-full hover:bg-gray-900"
                onClick={() => setarchive(item)}
              >
                {item.archive}
              </p>
              <p
                className="cursor-pointer text-black text-sm font-medium px-4 py-[2px] border hover:text-red-500 hover:border-red-500 border-gray-400 rounded-full"
                onClick={() => setdeleteditem(item)}
              >
                {item.delete}
              </p>
            </div>
          </div>
        ))}
      </div>
      {visible && (
        <div className="flex w-[70%] pr-0 flex-col">
          <div className="flex justify-between items-center px-2 py-3 border-gray-300 border-t border-b bg-gray-50 w-[100%]">
            <div className="flex items-center">
              <p
                onClick={hidedetailssection}
                className="text-sm cursor-pointer hover:scale-104 transition"
              >
                <FaArrowLeft />
              </p>
              <div className="flex items-center gap-2 pl-6 border-r pr-2 border-gray-400">
                <p className=" pt-[1px] text-lg cursor-pointer hover:scale-102 transition">
                  <RiInboxArchiveLine />
                </p>
                <p
                  className="text-[17px] cursor-pointer hover:scale-102 transition"
                  onClick={() => setdeleteditem}
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

          <div className="justify-self-start pt-6 text-start pl-4 w-[100%] pr-2">
            {detailssection.map(
              (item: Detail) =>
                item.id === currentIndex && (
                  <div key={item.id}>
                    <div>
                      <div>
                        <p className="text-2xl font-semibold">{item.subject}</p>
                        <p className="text-sm flex pb-4 items-center text-gray-500">
                          {item.receiver}{" "}
                          <span className="text-lg">
                            <IoMdArrowDropdown />
                          </span>{" "}
                        </p>
                        <p className="pb-6 pt-2">{item.receivername}</p>
                        <p className="text-[#222] text-sm">
                          {item.description}
                        </p>
                      </div>
                      <div className="pt-10">
                        <p className="text-sm text-[#222]">{item.footer}</p>
                        <p className="text-sm pt-1  text-blue-600 cursor-pointer underline">
                          {item.founder}
                        </p>
                        <p className="text-[15px] pt-1 text-[#222]">
                          {item.founderdetails}
                        </p>
                      </div>
                      <div className="pt-40">
                        <p className="pb-2 flex items-center gap-1 text-gray-600 font-semibold">
                          Reply{" "}
                          <span>
                            <FaReplyAll />
                          </span>{" "}
                        </p>
                        <div className="flex border py-1 pr-1 rounded-full">
                          <input                   
                            className="border-0 pl-4 outline-none w-full"
                            type="text"
                          />
                          <p
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
  );
}
