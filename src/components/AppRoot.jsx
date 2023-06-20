import React, { useEffect, useState } from "react";
import SideBar from "./SideBar";
import { Outlet } from "react-router-dom";
import axios from "axios";

function AppRoot() {
  // const [songs, setSongs]=useState([]);
  // useEffect(() => {
  //   axios.get("/api/test").then((res) => {
  //     const Songs = res.data.message;
  //     setSongs(Songs);
  //   });
  // });
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
