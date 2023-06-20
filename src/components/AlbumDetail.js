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
import TrackItem from "./TrackItem";
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
  const albumSong = [];

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
    <div className="Album">
      <form className="AlbumForm" id="form-id">
        <div className="AlbumItem">
          <div style={{ display: "flex" }}>
            <Avatar
              src={album.albumImage}
              alt={album.albumName}
              sx={{ width: "12.5vw", height: "12.5vw", marginRight: "2.3vw" }}
              style={{
                width: "12.5vw",
                height: "12.5vw",
                marginRight: "2.5vw",
              }}
            />
            <div
              className="albumInfo"
              style={{
                marginTop: "auto",
                marginBottom: "auto",
                marginLeft: "3vw",
                fontSize: "2vw",
              }}
            >
              <h1>{album.albumName}</h1>
              <p
                style={{
                  fontSize: "1.2vw",
                  color: "rgb(151, 150, 150)",
                  paddingTop: "1vw",
                }}
              >
                {" "}
                Ngày phát hành: {FormatDate(album.releaseDate)}
              </p>
              <div
                className="artists"
                style={{
                  fontSize: "1.2vw",
                  color: "rgb(151, 150, 150)",
                  paddingTop: "1vw",
                }}
              >
                {album.artist.map((child, index) => (
                  <span key={index} item={child}>
                    <Link
                      to={`/artistDetail/${child.artistName}`}
                      state={child}
                    >
                      {child.artistName}
                    </Link>
                  </span>
                ))}
              </div>
              <p
                style={{
                  fontSize: "1.2vw",
                  color: "rgb(151, 150, 150)",
                  paddingTop: "1vw",
                }}
              >
                {album.interestTimes} người yêu thích
              </p>
            </div>
          </div>
        </div>
        <div
          style={{
            fontSize: "2vw",
            marginTop: "1vw",
            marginBottom: "1vw",
            marginRight: "auto",
            marginLeft: "auto",
          }}
        >
          {" "}
          <label>Các bài hát</label>
        </div>
        {album.songs.map((child, index) => (
          <div className="song shadowDiv">
            <TrackItem key={index} item={child} />
          </div>
        ))}

        <div
          style={{
            marginRight: "auto",
            marginLeft: "auto",
            textAlign: "center",
          }}
        >
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
