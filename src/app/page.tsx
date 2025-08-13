"use client";
import Emaillayout from "@/Componets/Emaillayout";
export default function Home() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("Data");
    localStorage.removeItem("Deleted-item");
    localStorage.removeItem("All items");
    localStorage.removeItem("Archived-item");
    // localStorage.removeItem("draft-email");
    localStorage.removeItem("Sent-value");
    localStorage.removeItem("title");
    // localStorage.removeItem("title-subject");
  }
  return (
    <>
      <Emaillayout />
    </>
  );
}
