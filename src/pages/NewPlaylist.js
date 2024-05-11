import "../styles/newalbum.css";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { Error, Check } from "@mui/icons-material";
import TextField from "@mui/material/TextField";
import "../styles/newsong.css";
import { Alert, Button, Select } from "@mui/material";

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
function NewPlaylist() {
  const [imageUrl, setImageUrl] = useState("https://res.cloudinary.com/dlkakcrde/image/upload/v1685866494/pl1_vntdar.jpg");
  const [loadImage, setLoadImage] = useState(false);
  const [changeImg, setChangeImg] = useState(false);
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
        setChangeImg(true);
      }
    }
  };

  const playlistNameRef = useRef();
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
  const [songData, setSongData] = useState([]);
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:9090/api/songs").then((response) => {
      setSongData(response.data);
    });
    axios.get("http://localhost:9090/api/users").then((response) => {
      setUserData(response.data)
    })
  }, [userData, songData]);
  const [songId, setSongId] = useState([]);
  const [playlistId, setPlaylistId] = useState();
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSongId(value);
  };
  useEffect(() => {
    if (changeImg) {
      if (loadImage) {
        setSuccess("File hình ảnh đã được tải lên.");
        setShowAlertSuccess(true);
      }
    }
  }, [changeImg, loadImage, success, showAlertSuccess, showAlert]);
  useEffect(() => {
    if (playlistId != null) {
      axios.put("http://localhost:9090/api/playlists/" + playlistId + "/user/0").then((response) => {
        console.log(response.data);
      })
      songId.map((child) => {
        axios.put("http://localhost:9090/api/playlists/" + playlistId + "/song/" + child).then((response) => {
          console.log(response.data)
        })
      })
      navigate("/playlists");
    }
  }, [navigate, playlistId, songId]);
  const playlistHandler = () => {
    const playlistName = playlistNameRef.current.value;
    if (!playlistName) {
      return setAlertError("Vui lòng nhập đầy đủ thông tin!");
    }
    if (changeImg) {
      if (!loadImage) {
        return setAlertError("File hình ảnh chưa được tải lên.");
      }
    }
    //sign in successfully
    setShowAlertSuccess(false);
    setError(null);
    setShowAlert(false);
    const playlistDetail = {
      playlistName: playlistName,
      playlistImg: imageUrl
    }
    axios.post("http://localhost:9090/api/playlists", playlistDetail).then((response) => {
      setPlaylistId(response.data.id);
    })
  };
  return (
    <div className="newAlbum">
      <h1 className="newAlbumTitle">Thêm Playlist mới</h1>
      <form className="newAlbumForm" id="form-id">
        <div className="newAlbumItem">
          <label>Tên playlist</label>
          <TextField
            id="albumname"
            variant="outlined"
            inputRef={playlistNameRef}
          />
        </div>

        <div className="newAlbumItem">
          <label>Bài hát</label>
          <FormControl>
            <Select
              id="select_songs"
              multiple
              value={songId}
              onChange={handleChange}
              MenuProps={MenuProps}
            >
              {songData.map((child, index) => (
                <MenuItem key={child.id} item={child} value={child.id}>
                  {child.songName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div class="newAlbumLink">
          <label asp-for="ANHAL" class="control-label">
            Ảnh playlist
          </label>
          <input type="file" id="linkimage" onChange={processFileImage} />
          <span asp-validation-for="ANHAL" class="text-danger"></span>
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
            onClick={playlistHandler}
            variant="contained"
            className="buttonAdd"
          >
            Thêm playlist mới
          </Button>
        </div>
      </form>
    </div>
  );
}

export default NewPlaylist;
