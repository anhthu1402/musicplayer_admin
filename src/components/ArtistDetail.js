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
    <div className="newArtist">
      {/* <h1 className="newArtistTitle">Xem thông tin nghệ sĩ {artist.artistName}</h1> */}
      <form className="newArtistForm">
        <div className="newArtistItem">
          <div style={{display: 'flex'}}>
              <Avatar
                alt={artist.artistName}
                src={require("../assets/" + artist.artistImage)}
                sx={{ width: "12.5vw", height: "12.5vw", marginRight: "2.3vw" }}
                style = {{ width: "12.5vw", height: "12.5vw", marginRight: "2.3vw" }}
              />
              <div style = {{marginTop: "auto", marginBottom: "auto", marginLeft: "3vw", fontSize: "3vw"}}>
                  <h1 >{artist.artistName}</h1>
                  <div>
                      <h4 style={{ fontSize: "1.2vw", color:"rgb(151, 150, 150)", paddingTop:"1vw" }}>
                          <span>{artist.numberOfFollower} người theo dõi</span>
                      </h4>
                  </div>
                 
              </div>
          </div>      
        </div>
        <div style={{ fontSize: "1.2vw",  marginBottom: "1vw"}}>
          <label style={{ fontSize: "2vw", color:"rgb(151, 150, 150)",  marginBottom: "1vw"}}>Giới thiệu</label>
          <p>{artist.introduce}</p>
        </div>
        <div style={{ fontSize: "2vw",  marginBottom: "1vw", color:"rgb(151, 150, 150)" }}> <label>Các bài hát</label></div>
        <div className="listSongs">
                {artistSongs.map(
                  (item, index) => (
                      <div className="song shadowDiv">
                        <SongItem
                          key={index}
                          item={item}
                          tracks={artistSongs}
                          index={index}
                        />
                      </div>
                    )
                )}
        </div>
        <div  style={{marginRight:'auto', marginLeft:'auto'}}>
          <Button
            onClick={artistHandle}
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

export default ArtistDetail;