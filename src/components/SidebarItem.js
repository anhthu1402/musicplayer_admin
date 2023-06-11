import { useState, useContext } from "react";
import React from "react";
import { Link } from "react-router-dom";
import SidebarContext from "../SidebarContext";

export default function SidebarItem({ item }) {
  const [open, setOpen] = useState(false);
  function isTotal(path) {
    if (window.location.pathname === path) {
      return 1;
    } else return 0;
  }
  const sidebar = useContext(SidebarContext);
  if (item.subNav) {
    return (
      <div
        className={open ? "sidebar-item open" : "sidebar-item"}
        id={
          window.location.pathname === item.path && open === false
            ? "active"
            : "inactive"
        }
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
        <div className="sidebar-title">
          <span
            onClick={() => {
              window.location.pathname = item.path;
            }}
          >
            <Link
              className="sidebar-link"
              to={item.path}
              style={{ textDecoration: `none`, color: `black` }}
            >
              {item.icon}
              {item.title}
            </Link>
          </span>
          <i
            className="toogle-button"
            style={{ cursor: `pointer` }}
            onClick={() => setOpen(!open)}
          >
            {!open ? item.iconOpened : item.iconClosed}
          </i>
        </div>
        <div className="sidebar-content">
          {item.subNav.map((child, index) => (
            <SidebarItem key={index} item={child} />
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <a
        href={item.path || "#"}
        className="sidebar-item plain"
        id={isTotal(item.path) ? "active" : "inactive"}
      >
        <Link to={item.path} className="sidebar-item plain"
          id={isTotal(item.path) ? "active" : "inactive"}>
            <span>
              {item.icon}
              {item.title}
            </span>
        </Link>
      </a>
    );
  }
}
