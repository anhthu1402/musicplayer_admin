import React from "react";
import SidebarItem from "./SidebarItem";
import { SidebarData } from "./SidebarData";
import "../styles/Sidebar.css";
import { Link } from "react-router-dom";
import Logo from "../assets/Logo.png";
import Header from "../components/Header";

function SideBar() {
  return (
    <div className="sidebar">
      <div>
        <Link className="sidebar-header" to={"/home"}>
          <img src={Logo} alt="" />
          <h2>UIT MP3</h2>
        </Link>
      </div>
      {SidebarData.map((item, index) => (
        <SidebarItem key={index} item={item} />
      ))}
      <div>
    </div>
    </div>
      
  );
}

export default SideBar;
