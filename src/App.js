import "./App.css";
import {
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import MUser from "./pages/MUser";
import MArtist from "./pages/MArtist";
import MSong from "./pages/MSong";
import MAlbum from "./pages/MAlbum";
import Dashboard from "./pages/Dashboard";
import NewArtist from "./pages/NewArtist";
import NewSong from "./pages/NewSong";
import NewUser from "./pages/NewUser";
import NewAlbum from "./pages/NewAlbum";
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
          path: "dashboard",
          element: <Dashboard />,
        },
        {
          path: "songs",
          children: [
            {
              index: true,
              element: <MSong />,
            },
            {
              path: "edit/:id",
              children: [
                {
                  index: true,
                  element: <EditSong />,
                }
              ]
            },
            {
              path: "create",
              children: [
                {
                  index: true,
                  element: <NewSong />,
                }
              ]
            },
          ]

        },
        {
          path: "artists",
          children: [
            {
              index: true,
              element: <MArtist />,
            },
            {
              path: "edit/:id",
              children: [
                {
                  index: true,
                  element: <EditArtist />,
                }
              ]
            },
            {
              path: "detail/:id",
              children: [
                {
                  index: true,
                  element: <ArtistDetail />,
                }
              ]
            },
            {
              path: "create",
              children: [
                {
                  index: true,
                  element: <NewArtist />,
                }
              ]
            },
          ]
        },
        {
          path: "playlists",
          children: [
            {
              index: true,
              element: <MPlaylist />,
            },
            {
              path: "edit/:id",
              children: [
                {
                  index: true,
                  element: <EditPlaylist />,
                }
              ]
            },
            {
              path: "detail/:id",
              children: [
                {
                  index: true,
                  element: <PlaylistDetail />,
                }
              ]
            },
            {
              path: "create",
              children: [
                {
                  index: true,
                  element: <NewPlaylist />,
                }
              ]
            },
          ]
        },
        {
          path: "albums",
          children: [
            {
              index: true,
              element: <MAlbum />,
            },
            {
              path: "edit/:id",
              children: [
                {
                  index: true,
                  element: <EditAlbum />,
                }
              ]
            },
            {
              path: "detail/:id",
              children: [
                {
                  index: true,
                  element: <AlbumDetail />,
                }
              ]
            },
            {
              path: "create",
              children: [
                {
                  index: true,
                  element: <NewAlbum />,
                }
              ]
            },
          ]
        },
        {
          path: "users",
          children: [
            {
              index: true,
              element: <MUser />,
            },
            {
              path: "create",
              children: [
                {
                  index: true,
                  element: <NewUser />,
                }
              ]
            },
          ]
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
