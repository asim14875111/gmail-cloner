"use client";
import "./globals.css";
import { MyContext } from "@/Componets/MyContext";
function resetInboxForNewUser() {
  console.log("function called from context");
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-sm  text-[#222]">
        <MyContext.Provider value={{ resetInboxForNewUser }}>
          {children}
        </MyContext.Provider>
      </body>
    </html>
  );
}
