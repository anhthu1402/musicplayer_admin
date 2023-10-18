import "./App.css";
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
import NewArtist from "./pages/NewArtist";
import NewSong from "./pages/NewSong";
import NewUser from "./pages/NewUser";
import NewAlbum from "./pages/NewAlbum";
import SignUp from "./components/SignUp";
import UpLoadSong from "./components/UpLoadSong";
import ArtistDetail from "./pages/ArtistDetail";
import AppRoot from "./components/AppRoot";
import EditSong from "./pages/EditSong";
import EditAlbum from "./pages/EditAlbum";
import EditArtist from "./pages/EditArtist";
import MPlaylist from "./pages/MPlaylist";
import NewPlaylist from "./pages/NewPlaylist";
import AlbumDetail from "./pages/AlbumDetail";
import PlaylistDetail from "./pages/PlaylistDetail";
import EditPlaylist from "./pages/EditPlaylist"

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
          path: "dashboard",
          element: <Dashboard />,
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
          path: "artistDetail/*",
          element: <ArtistDetail />,
        },
        {
          path: "albumDetail/*",
          element: <AlbumDetail />,
        },
        {
          path: "playlistDetail/*",
          element: <PlaylistDetail />,
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
