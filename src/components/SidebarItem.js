import { useContext } from "react";
import React from "react";
import SidebarContext from "../SidebarContext";
import { Link } from "react-router-dom";

export default function SidebarItem({ item }) {
  const sidebar = useContext(SidebarContext);

  return (
    <Link to={item.path} style={{ textDecoration: 'none' }} replace={true}>
      <div
        className="sidebar-item plain"
        style={
          sidebar.pathName === item.pathName
            ? { backgroundColor: "#FFF0F4" }
            : { backgroundColor: "transparent" }
        }
        onClick={() => {
          sessionStorage.setItem("sidebarPath", JSON.stringify(item.pathName));
          sidebar.setPathName(item.pathName);
        }}
      >
        <span >
          {item.icon}
          {item.title}
        </span>
      </div>
    </Link>
  );
}
