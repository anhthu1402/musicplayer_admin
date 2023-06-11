import React, { createContext, useState } from "react";
const SidebarContext = createContext();
export const SidebarProvider = ({ children }) => {
  const [pathName, setPathName] = useState(
    sessionStorage.getItem("sidebarPath") !== null
      ? JSON.parse(sessionStorage.getItem("sidebarPath"))
      : "Khám phá"
  );
  return (
    <SidebarContext.Provider value={{ pathName, setPathName }}>
      {children}
    </SidebarContext.Provider>
  );
};
export default SidebarContext;
