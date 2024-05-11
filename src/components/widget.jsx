import "../styles/widget.scss";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import {
  MusicNoteRounded,
  PersonRounded,
  PlaylistPlayRounded,
} from "@mui/icons-material";
import AlbumSharpIcon from "@mui/icons-material/AlbumSharp";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import SidebarContext from "../SidebarContext";
import axios from "axios";

const Widget = ({ type }) => {
  let data;
  const [songData, setSongData] = useState(0);
  const [albumData, setAlbumData] = useState(0);
  const [artistData, setArtistData] = useState(0);
  const [playlistData, setPlaylistData] = useState(0);
  const [userData, setUserData] = useState(0);
  useEffect(() => {
    axios
      .get("http://localhost:9090/api/songs/number-of-songs")
      .then((response) => {
        if (songData === 0 || songData !== response.data) {
          setSongData(response.data);
        }
      });
    axios
      .get("http://localhost:9090/api/albums/number-of-albums")
      .then((response) => {
        if (albumData === 0 || albumData !== response.data) {
          setAlbumData(response.data);
        }
      });
    axios
      .get("http://localhost:9090/api/playlists/number-of-playlists")
      .then((response) => {
        if (playlistData === 0 || playlistData !== response.data) {
          setPlaylistData(response.data);
        }
      });
    axios
      .get("http://localhost:9090/api/artists/number-of-artists")
      .then((response) => {
        if (artistData === 0 || artistData !== response.data) {
          setArtistData(response.data);
        }
      });
    axios
      .get("http://localhost:9090/api/users/number-of-users")
      .then((response) => {
        if (userData === 0 || userData !== response.data) {
          setUserData(response.data);
        }
      });
  }, [songData, albumData, playlistData, artistData, userData]);
  const sidebar = useContext(SidebarContext);

  switch (type) {
    case "user":
      data = {
        title: "Người dùng",
        linkTitle: "Tất cả người dùng",
        amount: userData,
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
        amount: songData,
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
        amount: artistData,
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
        amount: albumData,
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
        amount: playlistData,
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
