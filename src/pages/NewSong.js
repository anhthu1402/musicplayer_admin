import React, { useEffect, useState, useRef } from "react";
import "../styles/newsong.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { Error, Check } from "@mui/icons-material";
import TextField from "@mui/material/TextField";
import { Alert, Backdrop, Button, CircularProgress, Select } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { formatDate } from "../service";

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

function NewSong() {
  const [audioUrl, setAudioUrl] = useState("");
  const [timeLimit, setTimeLimit] = useState(0);
  const [imageUrl, setImageUrl] = useState("");
  const [loadImage, setLoadImage] = useState(false);
  const [loadAudio, setLoadAudio] = useState(false);
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
  const songnameRef = useRef();
  const lyricsRef = useRef();
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
  const [countryData, setCountryData] = useState([]);
  const [artistData, setArtistData] = useState([]);
  const [albumData, setAlbumData] = useState([]);
  useEffect(() => {
    if (countryData.length === 0) {
      axios.get("http://localhost:9090/api/countries").then((response) => {
        setCountryData(response.data);
      })
        .catch((error) => console.log(error));
    }
    if (artistData.length === 0) {
      axios.get("http://localhost:9090/api/artists").then((response) => {
        setArtistData(response.data);
      })
        .catch((error) => console.log(error));
    }
    if (albumData.length === 0) {
      axios.get("http://localhost:9090/api/albums").then((response) => {
        setAlbumData(response.data);
      })
        .catch((error) => console.log(error));
    }
  }, [countryData, artistData, albumData]);
  const [songId, setSongId] = useState(0);
  //Danh sách id nghệ sĩ
  const [representationId, setRepresentationId] = useState([]);
  const [composerId, setComposerId] = useState([]);
  const [album, setAlbum] = useState();
  const [country, setCountry] = useState();
  const [date, setDate] = useState("");
  const representationChange = (event) => {
    const {
      target: { value },
    } = event;
    setRepresentationId(value);
  };
  const composerChange = (event) => {
    const {
      target: { value },
    } = event;
    setComposerId(value);
  };
  useEffect(() => {
    if (loadAudio && loadImage) {
      setLoadSuccess(true);
      setSuccess("File hình ảnh và bài hát đã được tải lên.");
      setShowAlertSuccess(true);
    }
  }, [loadSucces, loadAudio, loadImage, success, showAlertSuccess]);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (songId !== 0) {
      representationId.map((child) => {
        axios.put("http://localhost:9090/api/songs/" + songId + "/representation/" + child).then((res => {
          console.log(res.data);
        })).catch((error) => console.log(error))
      })
      composerId.map((child) => {
        axios.put("http://localhost:9090/api/songs/" + songId + "/composer/" + child).then((res => {
          console.log(res.data);
        })).catch((error) => console.log(error))
      })
      navigate("/songs")
    }
  }, [songId, representationId, composerId, navigate])

  const songHandler = () => {
    const songName = songnameRef.current.value;
    const lyrics = lyricsRef.current.value;
    if (
      !songName || !lyrics || !composerId || !representationId ||
      !country || !date || !album
    ) {
      return setAlertError("Vui lòng nhập đầy đủ thông tin!");
    }
    if (!loadAudio && !loadImage) {
      return setAlertError("File hình ảnh hoặc bài hát chưa được tải lên.");
    }
    if (!loadSucces) {
      return setAlertError(
        "File hình ảnh hoặc bài hát đang được tải lên, vui lòng chờ trong giây lát."
      );
    }
    //sign in successfully
    setOpen(true);
    setError(null);
    setShowAlert(false);
    const songDetail = {
      songName: songName,
      songImage: imageUrl,
      songLink: audioUrl,
      timeLimit: timeLimit,
      releaseDate: date,
      lyrics: lyrics,
      country: country
    };
    axios.post("http://localhost:9090/api/songs/album/" + album, songDetail).then((response) => {
      setSongId(response.data.id);
    })
      .catch((error) => console.log(error));
  };
  return (
    <div className="newSong">
      <h1 className="newSongTitle">Thêm bài hát mới</h1>
      <form
        className="newSongForm"
        id="form-id"
        action="~/admin/Ql_BaiHat/ThemBaiHat"
        method="POST"
      >
        <div className="newSongItem">
          <label>Tên bài hát</label>
          <TextField id="songname" variant="outlined" inputRef={songnameRef} />
        </div>
        <div className="newSongItem">
          <label>Người trình bày</label>
          <FormControl>
            <Select
              id="select_representations"
              multiple
              value={representationId}
              onChange={representationChange}
              MenuProps={MenuProps}
            >
              {artistData.map((child, index) => (
                <MenuItem key={child.id} item={child} value={child.id}>
                  {child.artistName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="newSongItem">
          <label>Sáng tác</label>
          <FormControl>
            <Select
              id="select_composers"
              multiple
              value={composerId}
              onChange={composerChange}
              MenuProps={MenuProps}
            >
              {artistData.map((child, index) => (
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
              onChange={(e) => {
                setAlbum(e.target.value);
              }}
              MenuProps={MenuProps}
            >
              {albumData.map((child, index) => (
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
              onChange={(e, value) => {
                setCountry(value.props.item)
              }}
              MenuProps={MenuProps}
            >
              {countryData.map((child, index) => (
                <MenuItem key={child.id} item={child} value={child.id}>
                  {child.countryName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="newSongItem">
          <label className="control-label">Ngày phát hành</label>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                onChange={(e) => {
                  setDate(formatDate(e.$D, e.$M + 1, e.$y));
                }}
              />
            </DemoContainer>
          </LocalizationProvider>
        </div>
        <div className="newSongItem">
          <label asp-for="LOIBAIHAT" className="control-label">
            Lời bài hát
          </label>
          <TextField
            id="songLyric"
            multiline
            rows={6}
            inputRef={lyricsRef}
          />
          <span asp-validation-for="LOIBAIHAT" className="text-danger"></span>
        </div>
        <div className="newSongLink">
          <label asp-for="LINKBH" className="control-label">
            Link bài hát
          </label>
          <input type="file" id="linkaudio" onChange={processFileAudio} />
          <span asp-validation-for="LINKBH" className="text-danger"></span>
        </div>
        <div className="newSongLink">
          <label asp-for="ANHBH" className="control-label">
            Ảnh bài hát
          </label>
          <input type="file" id="linkimage" onChange={processFileImage} />
          <span asp-validation-for="ANHBH" className="text-danger"></span>
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
            Thêm bài hát mới
          </Button>
        </div>
      </form>
      <Backdrop sx={{ color: "#fff", zIndex: 10 }} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

export default NewSong;
