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

function EditAlbum() {
  const [imageUrl, setImageUrl] = useState("");
  const [loadImage, setLoadImage] = useState(false);
  const [remainImage, setRemainImage] = useState(false);
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
  const location = useLocation();
  const album = location.state;

  const albumNameRef = useRef();
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
  const artist = [];
  album.artist.map((item, index) => {
    artist.push(item.id);
  });
  function FormatDate(string) {
    var options = { year: "numeric", month: "numeric", day: "numeric" };
    return new Date(string).toLocaleDateString([], options);
  }

  const [personName, setPresonName] = useState(artist);
  //Danh sách id nghệ sĩ
  const [personId, setPresonId] = useState([]);
  const [countryId, setCountryId] = useState(album.country.id);
  const [date, setDate] = useState(dayjs(FormatDate(album.releaseDate)));
  const handleChange = (event) => {
    setPresonId(event.target.value);
    const {
      target: { value },
    } = event;
    setPresonName(value);
  };
  useEffect(() => {
    if (loadImage) {
      setSuccess("File hình ảnh đã được tải lên.");
      setShowAlertSuccess(true);
      setShowAlert(false);
    }
  }, [loadImage, success, showAlertSuccess, showAlert]);

  const handleRemainImage = () => {
    setImageUrl(album.albumImage);
    setLoadImage(true);
    setRemainImage(true);
  };
  const albumHandler = () => {
    const albumName = albumNameRef.current.value;
    if (!albumName || !personId || !countryId || !date) {
      return setAlertError("Vui lòng nhập đầy đủ thông tin!");
    }
    if (!loadImage && !remainImage) {
      return setAlertError("File hình ảnh chưa được tải lên.");
    }
    //sign in successfully
    setShowAlertSuccess(false);
    setError(null);
    setShowAlert(false);
    console.log(albumName, personId, countryId, date, imageUrl);
    navigate("/albums");
  };
  return (
    <div className="newAlbum">
      <h1 className="newAlbumTitle">Chỉnh sửa album</h1>
      <form className="newAlbumForm" id="form-id">
        <div className="newAlbumItem">
          <label>Tên album</label>
          <TextField
            id="albumname"
            variant="outlined"
            inputRef={albumNameRef}
            defaultValue={album.albumName}
          />
        </div>
        <div className="newAlbumItem">
          <label>Nghệ sĩ</label>
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
        <div className="newAlbumItem">
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

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div class="newAlbumLink">
            <label asp-for="ANHAL" class="control-label">
              Ảnh album
            </label>
            <input type="file" id="linkimage" onChange={processFileImage} />
            <span asp-validation-for="ANHAL" class="text-danger"></span>
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
            onClick={albumHandler}
            variant="contained"
            className="buttonAdd"
          >
            Cập nhật album
          </Button>
        </div>
      </form>
    </div>
  );
}

export default EditAlbum;
