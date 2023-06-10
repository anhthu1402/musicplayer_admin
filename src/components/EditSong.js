import React from "react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import "../styles/newsong.css";
import { ArtistsData } from "./ArtistsData";
import axios from "axios";
import { useState } from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { Error, Check } from "@mui/icons-material";
import TextField from "@mui/material/TextField";
import { Alert, Button, Select } from "@mui/material";
import { CountryData } from "./CountryData";
import { DatePicker } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AlbumData } from "./AlbumData";
import dayjs from "dayjs";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function EditSong() {
  const [audioUrl, setAudioUrl] = useState("");
  const [timeLimit, setTimeLimit] = useState(0);
  const [imageUrl, setImageUrl] = useState("");
  const [loadImage, setLoadImage] = useState(false);
  const [loadAudio, setLoadAudio] = useState(false);
  const [remainImage, setRemainImage] = useState(false);
  const [remainAudio, setRemainAudio] = useState(false);
  const [loadSucces, setLoadSuccess] = useState(false);
  const processFileAudio = async (e) => {
    var file = e.target.files[0];

    var POST_URL = "https://api.cloudinary.com/v1_1/ddtjntpxe/upload";
    processFile();
    var uniqueId;

    function processFile(e) {
      console.log("changed");
      uniqueId = "ddtjntpxe" + new Date().getTime();
      var size = file.size;
      var sliceSize = 10 * 1000000;
      var start = 0;

      setTimeout(loop, 500);

      function loop() {
        console.log("looping");
        var end = start + sliceSize;

        if (end > size) {
          end = size;
        }
        var s = file.slice(start, end);
        send(s, start, end - 1, size);
        if (end < size) {
          start += sliceSize;
          setTimeout(loop, 500);
        }
      }
    }

    async function send(piece, start, end, size) {
      // console.log("end", end);

      var formdata = new FormData();

      formdata.append("file", piece);
      formdata.append("cloud_name", "ddtjntpxe");
      formdata.append("upload_preset", "UIT-music-player");

      const headers = {
        Accept: "/",
        "Content-Type": "multipart/form-data",
      };
      headers["X-Unique-Upload-Id"] = uniqueId;
      headers["X-Requested-With"] = "XMLHttpRequest";
      headers["Content-Range"] = "bytes " + start + "-" + end + "/" + size;
      const requestConfig = {
        url: POST_URL,
        method: "POST",
        data: formdata,
        headers,
      };
      const response = await axios(requestConfig);
      if (response?.data?.asset_id) {
        //Here i am trying to print the output of the response after the video is posted in cloudinary
        console.log(response.data.url, "response");
        setAudioUrl(response.data.url);
        setTimeLimit(formatDuration(response.data.duration));
        setLoadAudio(true);
      }
    }
  };
  const processFileImage = async (e) => {
    var file = e.target.files[0];

    var POST_URL = "https://api.cloudinary.com/v1_1/ddtjntpxe/upload";
    processFile();
    var uniqueId;

    function processFile(e) {
      console.log("changed");
      uniqueId = "ddtjntpxe" + new Date().getTime();
      var size = file.size;
      var sliceSize = 10 * 1000000;
      var start = 0;

      setTimeout(loop, 500);

      function loop() {
        console.log("looping");
        var end = start + sliceSize;

        if (end > size) {
          end = size;
        }
        var s = file.slice(start, end);
        send(s, start, end - 1, size);
        if (end < size) {
          start += sliceSize;
          setTimeout(loop, 500);
        }
      }
    }

    async function send(piece, start, end, size) {
      // console.log("end", end);

      var formdata = new FormData();

      formdata.append("file", piece);
      formdata.append("cloud_name", "ddtjntpxe");
      formdata.append("upload_preset", "UIT-music-player");

      const headers = {
        Accept: "/",
        "Content-Type": "multipart/form-data",
      };
      headers["X-Unique-Upload-Id"] = uniqueId;
      headers["X-Requested-With"] = "XMLHttpRequest";
      headers["Content-Range"] = "bytes " + start + "-" + end + "/" + size;
      const requestConfig = {
        url: POST_URL,
        method: "POST",
        data: formdata,
        headers,
      };
      const response = await axios(requestConfig);
      if (response?.data?.asset_id) {
        //Here i am trying to print the output of the response after the video is posted in cloudinary
        console.log(response.data.url, "response");
        setImageUrl(response.data.url);
        setLoadImage(true);
      }
    }
  };
  function formatDuration(value) {
    value = Math.ceil(value);
    const minute = Math.floor(value / 60);
    const secondLeft = value - minute * 60;
    return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`;
  }
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
  const location = useLocation();
  const song = location.state;

  const songnameRef = useRef();
  const loibaihatRef = useRef();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showAlert, setShowAlert] = useState(error !== null ? true : false);
  const [showAlertSuccess, setShowAlertSuccess] = useState(
    success !== null ? true : false
  );
  const setAlertError = (error) => {
    setError(error);
    setShowAlert(true);
  };
  const artist = [];
  song.representation.map((item, index) => {
    artist.push(item.id);
  });
  const [personName, setPresonName] = useState(artist);
  //Danh sách id nghệ sĩ
  const [personId, setPresonId] = useState([]);
  const [albumId, setAlbumId] = useState(song.album.id);
  const [countryId, setCountryId] = useState(song.country.id);
  const [date, setDate] = useState(dayjs(formatDate(song.releaseDate)));
  const handleChange = (event) => {
    setPresonId(event.target.value);
    const {
      target: { value },
    } = event;
    setPresonName(value);
    console.log(personName);
  };
  useEffect(() => {
    if (loadAudio && loadImage) {
      setLoadSuccess(true);
      setSuccess("File hình ảnh và bài hát đã được tải lên.");
      setShowAlertSuccess(true);
      setShowAlert(false);
    }
    if (remainAudio && remainImage) {
      setLoadSuccess(true);
    }
  }, [
    loadSucces,
    loadAudio,
    loadImage,
    success,
    showAlertSuccess,
    showAlert,
    remainAudio,
    remainImage,
  ]);
  const handleRemainAudio = () => {
    setAudioUrl(song.songLink);
    setTimeLimit(song.timeLimit);
    setLoadAudio(true);
    setRemainAudio(true);
  };
  const handleRemainImage = () => {
    setImageUrl(song.songImage);
    setLoadImage(true);
    setRemainImage(true);
  };
  const songHandler = () => {
    const songName = songnameRef.current.value;
    const loibaihat = loibaihatRef.current.value;
    if (
      !songName ||
      !loibaihat ||
      !personId ||
      !countryId ||
      !date ||
      !albumId
    ) {
      return setAlertError("Vui lòng nhập đầy đủ thông tin!");
    }
    if (!loadAudio && !loadImage && !remainAudio && !remainImage) {
      return setAlertError("File hình ảnh hoặc bài hát chưa được tải lên.");
    }
    if (!loadSucces) {
      return setAlertError(
        "File hình ảnh hoặc bài hát đang được tải lên, vui lòng chờ trong giây lát."
      );
    }
    //sign in successfully
    setShowAlertSuccess(false);
    setError(null);
    setShowAlert(false);
    console.log(
      songName,
      personId,
      countryId,
      date,
      loibaihat,
      audioUrl,
      imageUrl,
      timeLimit,
      albumId
    );
    navigate("/songs");
  };

  return (
    <div className="newSong">
      <h1 className="newSongTitle">Chỉnh sửa bài hát</h1>
      <form className="newSongForm">
        <div className="newSongItem">
          <label>Tên bài hát</label>
          <TextField
            id="songname"
            variant="outlined"
            inputRef={songnameRef}
            defaultValue={song.songName}
          />
        </div>
        <div className="newSongItem">
          <label>Người trình bày</label>
          <FormControl>
            <Select
              id="select_artists"
              multiple
              value={personName}
              onChange={handleChange}
              MenuProps={MenuProps}
            >
              {ArtistsData.map((child, index) => (
                <MenuItem key={child.id} item={child} value={child.id}>
                  {child.artistName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="newSongItem">
          <label>Album</label>
          <FormControl>
            <Select
              id="select_album"
              value={albumId}
              onChange={(e) => {
                console.log(e.target.value);
                setAlbumId(e.target.value);
              }}
              MenuProps={MenuProps}
            >
              {AlbumData.map((child, index) => (
                <MenuItem key={child.id} item={child} value={child.id}>
                  {child.albumName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="newSongItem">
          <label>Quốc gia</label>
          <FormControl>
            <Select
              id="select_country"
              value={countryId}
              onChange={(e) => {
                console.log(e.target.value);
                setCountryId(e.target.value);
              }}
              MenuProps={MenuProps}
            >
              {CountryData.map((child, index) => (
                <MenuItem key={child.id} item={child} value={child.id}>
                  {child.countryName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="newSongItem">
          <label class="control-label">Ngày phát hành</label>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                value={date}
                onChange={(e) => {
                  setDate(formatDate(e.$D, e.$M + 1, e.$y));
                }}
              />
            </DemoContainer>
          </LocalizationProvider>
        </div>
        <div className="newSongItem">
          <label asp-for="LOIBAIHAT" class="control-label">
            Lời bài hát
          </label>
          <TextField
            id="songLyric"
            defaultValue={song.lyric}
            multiline
            rows={4}
            inputRef={loibaihatRef}
          />
          <span asp-validation-for="LOIBAIHAT" class="text-danger"></span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div className="newSongLink">
            <label asp-for="LINKBH" class="control-label">
              Link bài hát
            </label>
            <input type="file" id="linkaudio" onChange={processFileAudio} />
          </div>
          <Button
            variant="outlined"
            className="buttonStay"
            size="small"
            onClick={handleRemainAudio}
          >
            Giữ nguyên
          </Button>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div className="newSongLink">
            <label asp-for="ANHBH" class="control-label">
              Ảnh bài hát
            </label>
            <input type="file" id="linkimage" onChange={processFileImage} />
          </div>
          <Button
            variant="outlined"
            className="buttonStay"
            size="small"
            onClick={handleRemainImage}
          >
            Giữ nguyên
          </Button>
        </div>
        {showAlert && (
          <Alert
            icon={<Error fontSize="inherit" />}
            severity="warning"
            sx={{ margin: "20px 0" }}
          >
            {error}
          </Alert>
        )}
        {showAlertSuccess && (
          <Alert
            icon={<Check fontSize="inherit" />}
            severity="success"
            sx={{ margin: "20px 0" }}
          >
            {success}
          </Alert>
        )}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "20px 0",
          }}
        >
          <Button
            onClick={songHandler}
            variant="contained"
            className="buttonAdd"
          >
            Cập nhật bài hát
          </Button>
        </div>
      </form>
    </div>
  );
}

export default EditSong;
