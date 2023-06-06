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
} from "@mui/icons-material";
import AlbumSharpIcon from '@mui/icons-material/AlbumSharp';

export const SidebarData = [
  // {
  //   title: "Thống kê",
  //   path: "/total?type=song",
  //   icon: <LibraryMusic />,
  // },
  {
    title: "Dashboard",
    path: "/dashboard",
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
    title: "Quản lý nghệ sĩ",
    path: "/artists",
    icon: <PersonRounded />,
  },
  {
    title: "Quản lý người dùng",
    path: "/users",
    icon: <AccountCircle />,
  },
  /*
  {
    title: "Quản lý",
    path: "/",
    icon: <HomeRounded />,
    iconOpened: <ExpandMore />,
    iconClosed: <ExpandLess />,
    subNav: [
      {
        title: "Bài hát",
        path: "/home/songs",
        icon: <MusicNoteRounded />,
      },
      {
        title: "Nghệ sĩ",
        path: "/home/artists",
        icon: <PersonRounded />,
      },
      {
        title: "Playlist",
        path: "/home/playlists",
        icon: <PlaylistPlayRounded />,
      },
      {
        title: "User",
        path: "/home/users",
        icon: <AccountCircle />,
      },
    ],
  },
  */
  // {
  //   title: "BXH",
  //   path: "/charts",
  //   icon: <BarChartRounded />,
  // },
  // {
  //   title: "Top 100",
  //   path: "/top100",
  //   icon: <TrendingUpRounded />,
  // },
];
