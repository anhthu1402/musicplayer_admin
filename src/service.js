import { PlaylistData } from "./components/PlaylistData";
import { AlbumData } from "./components/AlbumData";
import { ArtistsData } from "./components/ArtistsData";
export const setSideBarData = (navigate, sidebar) => {
  switch (sidebar.pathName) {
    case "artists": {
      navigate("/artists");
      break;
    }
    case "users": {
      navigate("/users");
      break;
    }
    case "songs": {
      navigate("/songs");
      break;
    }
    case "albums": {
      navigate("/albums");
      break;
    }
    case "playlists": {
      navigate("/playlists");
      break;
    }
    case "dashboard": {
      navigate("/dashboard");
      break;
    }
    default: {

    }
  }
}

export const formatDate = (day, month, year) => {
  if (month < 10) {
    if (day < 10) {
      return year + "-0" + month + "-0" + day;
    } else return year + "-0" + month + "-" + day;
  } else {
    if (day < 10) {
      return year + "-" + month + "-0" + day;
    } else {
      return year + "-" + month + "-" + day;
    }
  }
}

export const FormatDate = (string) => {
  var options = { year: "numeric", month: "numeric", day: "numeric" };
  return new Date(string).toLocaleDateString([], options);
}

export const getPlaylistDetail = (playlistId) => {
  return PlaylistData.find((playlist) => playlist.id === playlistId);
};
export const getArtistDetail = (artistId) => {
  return ArtistsData.find((artist) => artist.id === artistId);
};

export const getAlbumDetail = (albumId) => {
  return AlbumData.find((album) => album.id === albumId);
};

export const changePlaylistName = (playlistId, name) => {
  console.log(playlistId, name);
};

export const createPlaylist = (playlistName) => {
  console.log(playlistName);
};
//Vao trang TrackItem de sua tham so truyen vao cua ham
export const addFavSong = (songId, userId) => {
  console.log(songId, userId);
};

export const addToPlaylist = (songId, playlistId) => {
  console.log(songId, playlistId);
};

export const deletePlaylist = (playlistId, userId) => {
  console.log(playlistId, userId);
};

export const addFavPlaylist = (playlistId, userId) => {
  console.log(playlistId, userId);
};
export const removeFromFavPlaylist = (playlistId, userId) => {
  console.log(playlistId, userId);
};
export const removeFromFavSong = (songId, userId) => {
  console.log(songId, userId);
};

export const showNotification = (notification, content) => {
  notification.setUsing(true);
  notification.setContent(content);
};

export const addToLocalPlaylist = (song, musicPlayer) => {
  const playlist = JSON.parse(localStorage.getItem("playlist"));
  playlist.push(song);
  musicPlayer.setPlaylist(playlist);
  localStorage.setItem("playlist", JSON.stringify(playlist));
  console.log(playlist);
};

export const addPlaylistToLocalPlaylist = (playlistId, musicPlayer) => {
  const playlistDetail = getPlaylistDetail(playlistId);
  const playlist =
    localStorage.getItem("playlist") !== null
      ? JSON.parse(localStorage.getItem("playlist"))
      : musicPlayer.playlist;
  playlistDetail.songPlaylist.map((item, index) => {
    playlist.push(item);
  });
  musicPlayer.setPlaylist(playlist);
  localStorage.setItem("playlist", JSON.stringify(playlist));
  console.log(playlist);
};

export const addAlbumToLocalPlaylist = (albumId, musicPlayer) => {
  const albumDetail = getAlbumDetail(albumId);
  const playlist = JSON.parse(localStorage.getItem("playlist"));
  albumDetail.songs.map((item, key) => {
    playlist.push(item);
  });
  musicPlayer.setPlaylist(playlist);
  localStorage.setItem("playlist", JSON.stringify(playlist));
  console.log(playlist);
};

export const addLocalPlaylistToPlaylist = (playlistId) => {
  const playlist = JSON.parse(localStorage.getItem("playlist"));
  playlist.map((item, index) => {
    addToPlaylist(item.id, playlistId);
  });
  console.log(playlist);
};

export const deleteLocalPlaylist = (musicPlayer) => {
  localStorage.removeItem("playlist");
  musicPlayer.setPlaylist([]);
  localStorage.removeItem("song");
  localStorage.removeItem("tracks");
  localStorage.removeItem("index");
  localStorage.removeItem("currentTime");
  musicPlayer.setUsing(false);
  localStorage.setItem("play", false);
};

export const changeUserName = (userId, name) => {
  console.log(userId, name);
};

export const changeArtist = (playlistId, name) => {
  console.log(playlistId, name);
};
