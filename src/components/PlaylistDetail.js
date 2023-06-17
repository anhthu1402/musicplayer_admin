import "../styles/newalbum.css";
import { ArtistsData } from "./ArtistsData";
import "../styles/newsong.css";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { Error, Check } from "@mui/icons-material";
import TextField from "@mui/material/TextField";
import "../styles/newsong.css";
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
import { Card, CardContent, Typography } from "@mui/material";
function PlaylistDetail() {
    const location = useLocation();
    const navigate = useNavigate();
    const playlist = location.state;
  const ablumHandle = () => {
    navigate("/playlists");
  };
  return (
    <div className="newAlbum">
      <form className="newAlbumForm" id="form-id">
        <div className="newAlbumItem">
            <div style={{display: 'flex'}} >
                <Avatar
                    src={playlist.playlistImg} alt={playlist.playlistName}
                    sx={{ width: "12.5vw", height: "12.5vw", marginRight: "2.3vw" }}
                    style = {{ width: "12.5vw", height: "12.5vw", marginRight: "2vw" }}
                />
                <div className="playlistInfo"  style = {{marginTop: "auto", marginBottom: "auto", marginLeft: "2vw", fontSize: "2vw"}}>
                    <h1 >{playlist.playlistName}</h1>
                    <p style={{ fontSize: "1.2vw", color:"rgb(151, 150, 150)", paddingTop:"1vw" }}>Người tạo: {playlist.user}</p>
                </div>
            </div>      
        </div>
        <div style={{ fontSize: "2vw",  marginBottom: "1vw",  marginRight:'auto', marginLeft:'auto'}}> <label>Các bài hát</label></div>
                {playlist.songPlaylist.map((child, index) => (
                                <div key={index} item={child}>
                                     <Card className={"cardSong"}>
                                        <CardContent className={"songItem"}>
                                        <div
                                            className="songMedia"
                                        >
                                            <img
                                            style={{
                                                width: `4vw`,
                                                height: `4vw`,
                                                border: `0.2px solid transparent`,
                                                borderRadius: `3px`,
                                                position: "relative",
                                                marginRight: `1vw`,
                                            }}
                                            src={child.songImage}
                                            alt={child.songName}
                                            />
                                            {/* <button className="playBtn">
                                            <PlayArrowRounded />
                                            </button> */}
                                        </div>
                                        <div className={"Detail"}>
                                            <div className={"songHeader"}>
                                            <Typography
                                                gutterBottom
                                                variant="h5"
                                                sx={{
                                                fontSize: "1.6vw",
                                                "@media (max-width: 1163px)": {
                                                    fontSize: "1.8vw",
                                                },
                                                }}
                                            >
                                                {child.songName}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                className={"songArtist"}
                                                sx={{
                                                fontSize: "1vw",
                                                "@media (max-width: 1163px)": {
                                                    fontSize: "1.4vw",
                                                },
                                                }}
                                            >
                                                {child.representation.map((child, index) => {
                                                return (
                                                    <span key={index} item={child} className="artist">
                                                     {child.artistName}
                                                    {/* <Link
                                                        to={`/artistDetail/${child.artistName}`}
                                                        state={child}
                                                        color="grey"
                                                    >
                                                        {child.artistName}
                                                    </Link> */}
                                                    </span>
                                                );
                                                })}
                                            </Typography>
                                            </div>
                                            <div className={"songMoreDetail"}>
                                            <Typography
                                                className={"time"}
                                                sx={{
                                                "@media (max-width: 969px)": {
                                                    fontSize: "1.6vw !important",
                                                },
                                                }}
                                            >
                                                {child.timeLimit}
                                            </Typography>
                                            </div>
                                        </div>
                                        </CardContent>
                                    </Card>
                </div>
        ))}
               
        <div style={{marginRight:'auto', marginLeft:'auto'}}>
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