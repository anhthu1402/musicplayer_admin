import React, { useState } from "react";
import "../styles/Song.css";
import FavoriteSong from "../components/FavoriteSong";
import UploadedSong from "../components/UploadedSong";

function Song() {
  const [favorite, setFavorite] = useState(true);
  const Page = favorite ? FavoriteSong : UploadedSong;
  return (
    <div className="librarySong">
      <div>
        <div className="horizoneLine"></div>
        <div className="librarySongBtn">
          <button
            className={favorite ? "favBtn" : "noneFavBtn"}
            onClick={() => setFavorite(true)}
          >
            Yêu thích
          </button>
          <button
            className={favorite ? "noneUpBtn" : "upBtn"}
            onClick={() => setFavorite(false)}
          >
            Đã tải lên
          </button>
        </div>
      </div>
      <div className="librarySongContent">
        <Page />
      </div>
    </div>
  );
}

export default Song;
