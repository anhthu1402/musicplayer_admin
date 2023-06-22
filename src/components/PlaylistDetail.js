import "../styles/newalbum.css";
import { ArtistsData } from "./ArtistsData";
import "../styles/newsong.css";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { Alert, Button, Select } from "@mui/material";
import { CountryData } from "./CountryData";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { Avatar } from "antd";
import { SongData } from "./SongData";
import SongItem from "./SongItem";
import TrackItem from "./TrackItem";

import { Card, CardContent, Typography } from "@mui/material";
function PlaylistDetail() {
    const location = useLocation();
    const navigate = useNavigate();
    const playlist = location.state;
  const ablumHandle = () => {
    navigate("/playlists");
  };
  return (
    <div className="Playlist">
      <form className="PlaylistForm" id="form-id">
        <div className="PlaylistItem">
            <div style={{display: 'flex'}} >
                <Avatar
                    src={playlist.playlistImg} alt={playlist.playlistName}
                    sx={{ width: "12.5vw", height: "12.5vw", marginRight: "2.3vw" }}
                    style = {{ width: "12.5vw", height: "12.5vw", marginRight: "2.5vw" }}
                />
                <div className="playlistInfo"  style = {{marginTop: "auto", marginBottom: "auto", marginLeft: "3vw", fontSize: "2vw"}}>
                    <h1 >{playlist.playlistName}</h1>
                    <p style={{ fontSize: "1.2vw", color:"rgb(151, 150, 150)", paddingTop:"1vw" }}>Người tạo: {playlist.user}</p>
                </div>
            </div>      
        </div>
        <div style={{ fontSize: "2vw",  marginTop:"1vw", marginBottom: "1vw",  marginRight:'auto', marginLeft:'auto'}}> <label>Các bài hát</label></div>
                {playlist.songPlaylist.map((child, index) => (
                                    <div className="song shadowDiv">
                                      <TrackItem key={index} item={child} />
                                    </div>
                                  ))}
                                           
               
        <div style={{marginRight:'auto', marginLeft:'auto', textAlign: "center"}}>
          <Button
            onClick={ablumHandle}
            variant="contained"
            className="buttonAdd"
          >
            Quay về
          </Button>
        </div>
      </form>
    </div>
  );
}

export default PlaylistDetail;