import React, { useState } from "react";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import "../styles/Total.css";
import TabContent from "../components/tab-content";
import { Link, useLocation } from "react-router-dom";

function Total() {
  const [song, setSongPage] = useState(true);
  const { search } = useLocation();
  
  const match = search.match(/type=(.*)/);
  const type = match?.[1];
  const contents = [
    {
      title: "Dashboard",
      content: (
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
          ad minim veniam, quis nostrud exercitation ullamco laboris, nisi ut
          aliquip ex ea commodo consequat.
        </p>
      ),
    },
    {
      title: "Seation2",
      content: (
        <div>
          <h2> Slideshow </h2>
        </div>
      ),
    },
    {
      title: "Section3",
      content: (
        <div>
          <h2>Image Modal</h2>
          <p>Click the image below to show the modal.</p>
        </div>
      ),
    },
    {
      title: "Section 4",
      content: (
        <div>
          <h2>LightBox</h2>
          <p>Click on each image below to show the modal.</p>
        </div>
      ),
    },
  ];
  return (
    <div className="total">
      <div className="totalHeader">
        <h1>Thống kê</h1>
        {/*
        <button>
          <PlayCircleOutlineIcon
            style={{ fontSize: `xx-large`, color: `pink` }}
          />
        </button>
       */}
      
      </div>
      {/* 
      <div className="totalSubHeader">
        <Link className="totalSongLink" to={"/total?type=song"}>
          <button onClick={() => setSongPage(true)}>Bài hát</button>
        </Link>
        <Link to={"/total?type=playlist"}>
          <button onClick={() => setSongPage(false)}>Playlist</button>
        </Link>
      </div>
      <div className={song ? "Song" : "Playlist"}>
        <hr style={{ border: `0.1px solid rgba(128, 128, 128, 0.356)` }}></hr>
        <hr
          className={song ? "indexSong" : "indexPlaylist"}
          style={{
            border: `1.6px solid #FF9EB6`,
            marginTop: `-3px`,
          }}
        ></hr>
        <div className="totalContent">
          {type === "song" && <Song />}
          {type === "playlist" && <Playlist />}
        </div>
      */}
      <div className="tab">
        <TabContent input={contents}/>
      </div>
      
    </div>

  );

}
 
export default Total;
