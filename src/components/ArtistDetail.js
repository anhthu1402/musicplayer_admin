import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
// import "../styles/Artist.css";
import { Avatar, Button } from "@mui/material";
import {
  PlayCircleFilledRounded,
  PersonAddAltRounded,
} from "@mui/icons-material";
import { SongData } from "../components/SongData";
import { Grid, Box } from "@mui/material";
import { getArtistDetail } from "../service";

function ArtistDetail() {
  const location = useLocation();
  const artist = location.state;
//   const tracks = SongData;
//   const artistSongs = [];
  return (
    <div>
      artist && (
        <div className="artistDetail">
          <div className="header">
            <div className="headerDetail">
              <Avatar
                alt={artist.artistName}
                src={artist.artistImage}
                sx={{ width: "12.5vw", height: "12.5vw", marginRight: "2.3vw" }}
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <h1 style={{ fontSize: "3.5vw", marginRight: "1.2vw" }}>
                    {artist.artistName}
                  </h1>
                  <PlayCircleFilledRounded
                    className="buttonPlay"
                    sx={{ fontSize: "4.2vw" }}
                  />
                </div>
                <h4 style={{ fontSize: "1.2vw" }}>
                  {artist.followers} người theo dõi
                </h4>
                <Button className="followBtn">
                  <PersonAddAltRounded
                    sx={{ marginRight: "1vw", fontSize: "1.5vw" }}
                  />{" "}
                  Theo dõi
                </Button>
              </div>
            </div>
          </div>
    </div>
    </div>
  );
}

export default ArtistDetail;