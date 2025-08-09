"use client";
import Emaillayout from "@/Componets/Emaillayout";
export default function Home() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("Data");
    localStorage.removeItem("Deleted-item");
  }
  return (
    <>
      <Emaillayout />
    </>
  );
}
