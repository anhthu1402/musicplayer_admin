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
  },
  {
    title: "Quản lý bài hát",
    path: "/songs",
    icon: <MusicNoteRounded />,
  },
  {
    title: "Quản lý Album",
    path: "/albums",
    icon: <AlbumSharpIcon />,
  },
  {
    title: "Quản lý Playlist",
    path: "/playlists",
    icon: <PlaylistPlaySharp />,
  },
  {
    title: "Quản lý nghệ sĩ",
    path: "/artists",
    icon: <PersonRounded />,
  },
  {
    title: "Quản lý người dùng",
    path: "/users",
    icon: <AccountCircle />,
  },
];
