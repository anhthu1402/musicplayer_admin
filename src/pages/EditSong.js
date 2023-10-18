import React, { useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "../styles/newsong.css";
import axios from "axios";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { Error, Check } from "@mui/icons-material";
import TextField from "@mui/material/TextField";
import { Alert, Button, Select } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { formatDate, FormatDate } from "../service";

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
  const location = useLocation();
  const song = location.state;

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
  const [songAlbum, setSongAlbum] = useState();
  const [album, setAlbum] = useState();
  useEffect(() => {
    axios.get("http://localhost:8080/api/countries").then((response) => {
      setCountryData(response.data);
    });
    axios.get("http://localhost:8080/api/artists").then((response) => {
      setArtistData(response.data);
    });
    axios.get("http://localhost:8080/api/albums").then((response) => {
      setAlbumData(response.data);
    });

    if (song != null) {
      axios.get("http://localhost:8080/api/songs/" + song.id + "/album").then((response) => {
        setSongAlbum(response.data);
      })
    }
  }, [countryData, artistData, albumData, album]);
  const representation = [];
  song.representation.map((item, index) => {
    representation.push(item.id);
  })
  const composer = [];
  song.composing.map((item, index) => {
    composer.push(item.id);
  })

  //Danh sách id nghệ sĩ
  const [representationId, setRepresentationId] = useState(representation);
  const [composerId, setComposerId] = useState(composer);
  const [country, setCountry] = useState(song.country);
  const [date, setDate] = useState(dayjs(FormatDate(song.releaseDate)));
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
    if (remainAudio && remainImage) {
      setLoadSuccess(true);
    }
  }, [
    loadSucces,
    loadAudio,
    loadImage,
    success,
    showAlertSuccess,
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
    const lyrics = lyricsRef.current.value;
    if (
      !songName || !composerId || !representationId || !date
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
    axios.put("http://localhost:8080/api/songs/" + song.id, songDetail).then((result) => {
      console.log(result.data);
      representationId.map((child) => {
        axios.put("http://localhost:8080/api/songs/" + song.id + "/representation/" + child).then((response) => {
          console.log(response.data);
        })
      })
      composerId.map((child) => {
        axios.put("http://localhost:8080/api/songs/" + song.id + "/composer/" + child).then((response) => {
          console.log(response.data);
        })
      })
      if (album != null && album.id !== songAlbum.id) {
        axios.put("http://localhost:8080/api/songs/" + song.id + "/album/" + album.id).then((response) => {
          console.log(response.data)
        })
      }
    })
    navigate("/songs")
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
              value={album != null ? album.id : songAlbum != null ? songAlbum.id : {}}
              onChange={(e, value) => {
                setAlbum(value.props.item);
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
              value={country != null ? country.id : song.country != null ? song.country.id : {}}
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
            defaultValue={song.lyrics}
            multiline
            rows={4}
            inputRef={lyricsRef}
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
