
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { Error, Check } from "@mui/icons-material";
import TextField from "@mui/material/TextField";
import { Alert, Backdrop, Button, CircularProgress, Select } from "@mui/material";
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
  const [countryData, setCountryData] = useState([]);
  const [artistData, setArtistData] = useState([]);
  useEffect(() => {
    if (countryData.length === 0) {
      axios.get("http://localhost:9090/api/countries").then((response) => {
        setCountryData(response.data);
      })
        .catch((error) => console.log(error));;
    }
    if (artistData.length === 0) {
      axios.get("http://localhost:9090/api/artists").then((response) => {
        setArtistData(response.data);
      })
        .catch((error) => console.log(error));
    }
  }, [countryData, artistData]);
  const artist = [];
  album.artist.map((item, index) => {
    artist.push(item.id);
  });
  //Danh sách id nghệ sĩ
  const [personId, setPresonId] = useState(artist);
  const [date, setDate] = useState(dayjs(album.releaseDate));
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPresonId(value);
  };
  useEffect(() => {
    if (loadImage) {
      setSuccess("File hình ảnh đã được tải lên.");
      setShowAlertSuccess(true);
      if (error === "File hình ảnh chưa được tải lên.") {
        setShowAlert(false);
      }
    }
  }, [loadImage, success, showAlertSuccess, showAlert, error]);
  const handleRemainImage = () => {
    setImageUrl(album.albumImage);
    setLoadImage(true);
    setRemainImage(true);
  };
  const albumInterestTimesRef = useRef();
  const [country, setCountry] = useState(album.country.id);
  const [open, setOpen] = useState(false);
  const albumHandler = () => {
    const albumName = albumNameRef.current.value;
    const albumInterestTimes = albumInterestTimesRef.current.value;
    if (!albumName || !personId || !date || !albumInterestTimes || !country) {
      return setAlertError("Vui lòng nhập đầy đủ thông tin!");
    }
    if (!loadImage && !remainImage) {
      return setAlertError("File hình ảnh chưa được tải lên.");
    }
    if (isNaN(albumInterestTimes)) {
      return setAlertError("Số lượt quan tâm phải là một số!");
    }
    //sign in successfully
    setOpen(true);
    setError(null);
    setShowAlert(false);
    const albumDetail = {
      albumName: albumName,
      interestTimes: albumInterestTimes,
      releaseDate: date,
      albumImage: imageUrl,
      countryId: country,
      artistId: personId
    };
    axios.put("http://localhost:9090/api/albums/" + album.id, albumDetail).then((response) => {
      navigate("/albums");
    }).catch((error) => console.log(error));


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
              value={personId}
              onChange={handleChange}
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
          <label>Quốc gia</label>
          <FormControl>
            <Select
              id="select_country"
              defaultValue={album.country.id}
              onChange={(e) => {
                setCountry(e.target.value)
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
        <div className="newAlbumItem">
          <label class="control-label">Ngày phát hành</label>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                value={date}
                onChange={(e) => {
                  setDate(e);
                }}
              />
            </DemoContainer>
          </LocalizationProvider>
        </div>
        <div className="newAlbumItem">
          <label htmlFor="albumInterestTimes">Số lượt quan tâm</label>
          <TextField
            id="albumInterestTimes" defaultValue={album.interestTimes}
            variant="outlined"
            inputRef={albumInterestTimesRef}
          />
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
      <Backdrop sx={{ color: "#fff", zIndex: 10 }} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

export default EditAlbum;
