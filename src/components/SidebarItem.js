import { useState, useContext } from "react";
import React from "react";
import { Link } from "react-router-dom";
import SidebarContext from "../SidebarContext";

export default function SidebarItem({ item }) {
  // const [open, setOpen] = useState(false);
  // function isTotal(path) {
  //   if (window.location.pathname === path) {
  //     return 1;
  //   } else return 0;
  // }
  const sidebar = useContext(SidebarContext);

  return (
    <div
      className="sidebar-item plain"
      style={
        sidebar.pathName === item.title
          ? { backgroundColor: "#FFF0F4" }
          : { backgroundColor: "transparent" }
      }
      onClick={() => {
        sessionStorage.setItem(
          "sidebarPathPrev",
          JSON.stringify(sidebar.pathName)
        );
        sessionStorage.setItem("sidebarPath", JSON.stringify(item.title));
        sidebar.setPathName(item.title);
      }}
    >
      <Link to={item.path} style={{ color: "black", textDecoration: "none" }}>
        <span>
          {item.icon}
          {item.title}
        </span>
      </Link>
    </div>
  );
}
