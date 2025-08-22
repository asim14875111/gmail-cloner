"use client";
import Emaillayout from "@/app/mail/page";
import Loginpage from "@/Componets/Loginpage";
 import Signup from "./signup/page";
 export default function Home() {
  // const router = useRouter();
  if (typeof window !== "undefined") {
    localStorage.removeItem("Data");
    localStorage.removeItem("Deleted-item");
    localStorage.removeItem("All items");
    localStorage.removeItem("Archived-item");
    localStorage.removeItem("Sent-value");
    localStorage.removeItem("title");
    localStorage.removeItem("compose-data");
    localStorage.removeItem("compose-description");
    localStorage.removeItem("compose-draft-title");
    localStorage.removeItem("compose-subject");
    localStorage.removeItem("draft-email");
    localStorage.removeItem("founder");
    localStorage.removeItem("title-subject");
    localStorage.removeItem("draft-founder");
    localStorage.removeItem("Length-of-archive");
    localStorage.removeItem("Deleted-item-length");
    localStorage.removeItem("length-of-sent-mails");
    localStorage.removeItem("drafts");
    localStorage.removeItem("Deleted-item");
  }

 

  return (
    <>
      <Signup />
      {/* <Loginpage/> */}
      {/* <Emaillayout /> */}
    </>
  );
}
