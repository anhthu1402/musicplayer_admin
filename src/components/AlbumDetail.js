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
import { getAlbumDetail } from "../service";
import { AlbumData } from "./AlbumData";
import { Card, CardContent, Typography } from "@mui/material";
function AlbumDetail() {
    const location = useLocation();
    const navigate = useNavigate();
    const album = location.state;
    // const id = location.state;
    // const albumDetail = getAlbumDetail(id);
    // const tracks = albumDetail.songs;
    const id = location.state;
    const albumDetail = getAlbumDetail(id);
    // const tracks = albumDetail.songs;
    
    const tracks = AlbumData;
    const artist = [];
    album.artist.map((item, index) => {
      artist.push(item.id);
    });
    
    const songs = [];
    album.songs.map((item, index) => {
      songs.push(item.id);
    });
    const [songId, setSongId] = useState(songs);
    const albumSong=[];

    // album.songs.map((item, index) => {
    //     albumSong.push(item);
    // });

    
  function formatDate(day, month, year) {
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
  function FormatDate(string) {
    var options = { year: "numeric", month: "numeric", day: "numeric" };
    return new Date(string).toLocaleDateString([], options);
  }
  const [date, setDate] = useState(dayjs(FormatDate(album.releaseDate)));

//   const location = useLocation();
//   const navigate = useNavigate();
//   const album = location.state;
//   const tracks = SongData;
//   const artist = [];
//     album.artist.map((item, index) => {
//     artist.push(item.id);
//   });
   
  const ablumHandle = () => {
    navigate("/albums");
  };
  return (
    <div className="newAlbum">
      <form className="newAlbumForm" id="form-id">
        <div className="newAlbumItem">
            <div style={{display: 'flex'}} >
                <Avatar
                    src={album.albumImage} alt={album.albumName}
                    sx={{ width: "12.5vw", height: "12.5vw", marginRight: "2.3vw" }}
                    style = {{ width: "12.5vw", height: "12.5vw", marginRight: "2.3vw" }}
                />
                <div className="albumInfo"  style = {{marginTop: "auto", marginBottom: "auto", marginLeft: "3vw", fontSize: "3vw"}}>
                    <h1 >{album.albumName}</h1>
                    <p style={{ fontSize: "1.2vw", color:"rgb(151, 150, 150)", paddingTop:"1vw" }}> Ngày phát hành: {FormatDate(album.releaseDate)}</p>
                    <div className="artists" style={{ fontSize: "1.2vw", color:"rgb(151, 150, 150)", paddingTop:"1vw" }}>
                        {album.artist.map((child, index) => (
                        <span key={index} item={child}>
                             {child.artistName}
                            {/* <Link  to={`/artistDetail/${child.artistName}`} state={child}>
                                {child.artistName}
                            </Link> */}
                        </span>
                        ))}
                    </div>
                    <p style={{ fontSize: "1.2vw", color:"rgb(151, 150, 150)", paddingTop:"1vw" }}>{album.interestTimes} người yêu thích</p>
                </div>
            </div>      
        </div>
        <div style={{ fontSize: "2vw",  marginBottom: "1vw",  marginRight:'auto', marginLeft:'auto'}}> <label>Các bài hát</label></div>
                {album.songs.map((child, index) => (
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

                                `          <div className={"Detail"}>
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

export default AlbumDetail;