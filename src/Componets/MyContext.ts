import { createContext } from "react";

interface MyContextType {
  resetInboxForNewUser: () => void;
}

export const MyContext = createContext<MyContextType | null>(null);
