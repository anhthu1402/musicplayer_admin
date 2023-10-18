import { useState, useContext } from "react";
import React from "react";
import { Link } from "react-router-dom";
import SidebarContext from "../SidebarContext";

export default function SidebarItem({ item }) {
  const sidebar = useContext(SidebarContext);

  return (
    <div
      className="sidebar-item plain"
      style={
        sidebar.pathName === item.pathName
          ? { backgroundColor: "#FFF0F4" }
          : { backgroundColor: "transparent" }
      }
      onClick={() => {
        // sessionStorage.setItem(
        //   "sidebarPathPrev",
        //   JSON.stringify(sidebar.pathName)
        // );
        sessionStorage.setItem("sidebarPath", JSON.stringify(item.pathName));
        sidebar.setPathName(item.pathName);
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
