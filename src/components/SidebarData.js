import React from "react";
import {
  ExpandMore,
  ExpandLess,
  LibraryMusic,
  HomeRounded,
  MusicNoteRounded,
  PersonRounded,
  PlaylistPlayRounded,
  BarChartRounded,
  TrendingUpRounded,
  AccountCircle,
  LineAxis,
  PlaylistPlaySharp,
} from "@mui/icons-material";
import AlbumSharpIcon from "@mui/icons-material/AlbumSharp";

export const SidebarData = [
  // {
  //   title: "Thống kê",
  //   path: "/total?type=song",
  //   icon: <LibraryMusic />,
  // },
  {
    title: "Dashboard",
    path: "/",
    icon: <LineAxis />,
    pathName: "dashboard",
  },
  {
    title: "Quản lý bài hát",
    path: "/songs",
    icon: <MusicNoteRounded />,
    pathName: "songs",
  },
  {
    title: "Quản lý Album",
    path: "/albums",
    icon: <AlbumSharpIcon />,
    pathName: "albums",
  },
  {
    title: "Quản lý Playlist",
    path: "/playlists",
    icon: <PlaylistPlaySharp />,
    pathName: "playlists",
  },
  {
    title: "Quản lý nghệ sĩ",
    path: "/artists",
    icon: <PersonRounded />,
    pathName: "artists",
  },
  {
    title: "Quản lý người dùng",
    path: "/users",
    icon: <AccountCircle />,
    pathName: "users",
  },
];
