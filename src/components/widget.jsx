import "../styles/widget.scss";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import {
  MusicNoteRounded,
  PersonRounded,
  PlaylistPlayRounded,
} from "@mui/icons-material";
import AlbumSharpIcon from "@mui/icons-material/AlbumSharp";
import { Link } from "react-router-dom";
import { UsersData } from "./UserData";
import { SongData } from "./SongData";
import { ArtistsData } from "./ArtistsData";
import { AlbumData } from "./AlbumData";
import { PlaylistData } from "./PlaylistData";
import { useContext } from "react";
import SidebarContext from "../SidebarContext";

const Widget = ({ type }) => {
  let data;

  //temporary
  // const amount = 100;
  const diff = 20;
  const sidebar = useContext(SidebarContext);

  switch (type) {
    case "user":
      data = {
        title: "Người dùng",
        linkTitle: "Tất cả người dùng",
        amount: UsersData.length,
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
        linkName: "Quản lý người dùng",
        link: "users",
      };
      break;
    case "song":
      data = {
        title: "Bài hát",
        linkTitle: "Tất cả bài hát",
        amount: SongData.length,
        icon: (
          <MusicNoteRounded
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
        linkName: "Quản lý bài hát",
        link: "songs",
      };
      break;
    case "artist":
      data = {
        title: "Nghệ sĩ",
        linkTitle: "Tất cả nghệ sĩ",
        amount: ArtistsData.length,
        icon: (
          <PersonRounded
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
        linkName: "Quản lý nghệ sĩ",
        link: "artists",
      };
      break;
    case "album":
      data = {
        title: "Album",
        amount: AlbumData.length,
        linkTitle: "Tất cả album",
        icon: (
          <AlbumSharpIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
        linkName: "Quản lý Album",
        link: "albums",
      };
      break;
    case "playlist":
      data = {
        title: "Playlist",
        amount: PlaylistData.length,
        linkTitle: "Tất cả playlist",
        icon: (
          <PlaylistPlayRounded
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),

        linkName: "Quản lý Playlist",
        link: "playlists",
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">{data.amount}</span>
        <Link
          to={"/" + data.link}
          onClick={() => {
            sidebar.setPathName(data.link);
            sessionStorage.setItem("sidebarPath", JSON.stringify(data.link));
          }}
        >
          <span>{data.linkTitle}</span>
        </Link>
      </div>
      <div className="right">
        {/* <div className="percentage positive">
          <KeyboardArrowUpIcon />
          {diff} %
        </div> */}
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
