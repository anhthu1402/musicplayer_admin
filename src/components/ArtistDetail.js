import "../styles/newartist.css";
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
import { SongData } from "./SongData";
import SongItem from "./SongItem";
import { Avatar } from "antd";
import { grey } from "@mui/material/colors";
import { color } from "@mui/system";
import TrackItem from "./TrackItem";

function ArtistDetail() {
  // const [imageUrl, setImageUrl] = useState("");
  // const [loadImage, setLoadImage] = useState(false);
  const location = useLocation();
  const artist = location.state;
  // const artistNameRef = useRef();
  // const introduceRef = useRef();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  // const [showAlert, setShowAlert] = useState(error !== null ? true : false);
  // const [showAlertSuccess, setShowAlertSuccess] = useState(
  //   success !== null ? true : false
  // );
  // const setAlertError = (error) => {
  //   setError(error);
  //   setShowAlert(true);
  // };

  const tracks = SongData;
  const artistSongs = [];
  tracks.map((item, index) => {
    item.representation.map((child, key) => {
      if (child.id === artist.id) {
        artistSongs.push(item);
      }
    });
  });
  const [remainImage, setRemainImage] = useState(false);
  // const handleRemainImage = () => {
  //   setImageUrl(artist.artistImage);
  //   setLoadImage(true);
  //   setRemainImage(true);
  // };
  // useEffect(() => {
  //   if (loadImage) {
  //     setSuccess("File hình ảnh đã được tải lên.");
  //     setShowAlertSuccess(true);
  //     setShowAlert(false);
  //   }
  // }, [loadImage, success, showAlertSuccess, showAlert]);
  const artistHandle = () => {
    navigate("/artists");
  };
  return (
    <div className="Artist">
      {artist && (
        <form className="ArtistForm">
          <div className="ArtistItem">
            <div style={{ display: "flex" }}>
              <Avatar
                src={artist.artistImage}
                alt={artist.artistName}
                sx={{ width: "12.5vw", height: "12.5vw", marginRight: "2.3vw" }}
                style={{
                  width: "12.5vw",
                  height: "12.5vw",
                  marginRight: "2.3vw",
                }}
              />
              <div
                style={{
                  marginTop: "auto",
                  marginBottom: "auto",
                  marginLeft: "3vw",
                  fontSize: "2vw",
                }}
              >
                <h1>{artist.artistName}</h1>
                <div>
                  <h4
                    style={{
                      fontSize: "1.2vw",
                      color: "rgb(151, 150, 150)",
                      paddingTop: "1vw",
                    }}
                  >
                    <span>{artist.numberOfFollower} người theo dõi</span>
                  </h4>
                </div>
              </div>
            </div>
          </div>
          {/* <div
            style={{
              fontSize: "1.2vw",
              marginBottom: "1.5vw",
              marginTop: "1vw",
            }}
          >
            <label
              style={{
                fontSize: "2vw",
                color: "rgb(151, 150, 150)",
                paddingBottom: "1.5vw",
              }}
            >
              Giới thiệu
            </label>
            <p>{artist.introduce}</p>
          </div> */}
          <div
            style={{
              fontSize: "2vw",
              marginBottom: "1vw",
              marginTop: "1vw",
              color: "rgb(151, 150, 150)",
            }}
          >
            {" "}
            <label>Các bài hát</label>
          </div>
          <div className="listSongs">
            {artistSongs.map((item, index) => (
              <div className="song shadowDiv">
                <TrackItem key={index} item={item} />
              </div>
            ))}
          </div>
          <div
            style={{
              marginRight: "auto",
              marginLeft: "auto",
              textAlign: "center",
            }}
          >
            <Button
              onClick={artistHandle}
              variant="contained"
              className="buttonAdd"
            >
              Quay về
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}

export default ArtistDetail;
