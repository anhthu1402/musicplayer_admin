import React from "react";
import SideBar from "./SideBar";
import { Outlet } from "react-router-dom";

function AppRoot() {
  return (
    <>
      <div style={{ position: "relative" }}>
        <div style={{ position: `fixed`, top: `0`, left: 0 }}>
          <SideBar />
        </div>

        <div
          style={{
            padding: `2vw 3vw 0 3vw`,
            width: `calc(100% - 17vw)`,
            position: `relative`,
            left: `17vw`,
            height: `calc(100%-18vh)`,
          }}
        >
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default AppRoot;
