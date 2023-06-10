import "./App.css";
import SideBar from "./components/SideBar";
import {
  Route,
  BrowserRouter as Router,
  RouterProvider,
  Routes,
  createBrowserRouter,
} from "react-router-dom";
import Total from "./pages/Total";
import MUser from "./pages/MUser";
import MArtist from "./pages/MArtist";
import MSong from "./pages/MSong";
import MAlbum from "./pages/MAlbum";
import Dashboard from "./pages/Dashboard";
import SignIn from "./pages/SignIn";
import NewArtist from "./components/NewArtist";
import NewSong from "./components/NewSong";
import NewUser from "./components/NewUser";
import NewAlbum from "./components/NewAlbum";
import SignUp from "./components/SignUp";
import DetailsUser from "./components/DetailUser";
import { Switch } from "@mui/material";
import UpLoadSong from "./components/UpLoadSong";
import ArtistDetail from "./components/ArtistDetail";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import AppRoot from "./components/AppRoot";
import EditSong from "./components/EditSong";
import EditAlbum from "./components/EditAlbum";
import EditArtist from "./components/EditArtist";
import MPlaylist from "./pages/MPlaylist";
import EditPlaylist from "./components/EditPlaylist";
import NewPlaylist from "./components/NewPlaylist";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppRoot />,
      children: [
        {
          index: true,
          element: <Dashboard />,
        },
        {
          path: "total",
          element: <Total />,
        },
        {
          path: "songs",
          element: <MSong />,
        },
        {
          path: "artists",
          element: <MArtist />,
        },
        {
          path: "playlists",
          element: <MPlaylist />,
        },
        {
          path: "signUp",
          element: <SignUp />,
        },
        {
          path: "albums",
          element: <MAlbum />,
        },
        {
          path: "users",
          element: <MUser />,
        },
        {
          path: "signIn",
          element: <SignIn />,
        },
        {
          path: "signUp",
          element: <SignUp />,
        },
        {
          path: "newArtist",
          element: <NewArtist />,
        },
        {
          path: "newSong",
          element: <NewSong />,
        },
        {
          path: "upload",
          element: <UpLoadSong />,
        },
        {
          path: "newUser",
          element: <NewUser />,
        },
        {
          path: "users/:id",
          element: <DetailsUser />,
        },
        {
          path: "artistDetail/*",
          element: <ArtistDetail />,
        },
        {
          path: "newAlbum",
          element: <NewAlbum />,
        },
        {
          path: "newPlaylist",
          element: <NewPlaylist />,
        },
        {
          path: "editSong/*",
          element: <EditSong />,
        },
        {
          path: "editAlbum/*",
          element: <EditAlbum />,
        },
        {
          path: "editArtist/*",
          element: <EditArtist />,
        },
        {
          path: "editPlaylist/*",
          element: <EditPlaylist />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
