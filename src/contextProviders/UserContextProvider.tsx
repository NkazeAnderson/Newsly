import React, { createContext } from "react";
import useUser from "../hooks/useUser";

export const UserContext = createContext<ReturnType<typeof useUser> | null>(
  null,
);

function UserContextProvider({ children }: { children: React.ReactNode }) {
  return (
    <UserContext.Provider value={useUser()}>{children}</UserContext.Provider>
  );
}

export default UserContextProvider;
