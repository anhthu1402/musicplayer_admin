import "../styles/newalbum.css";
import React, { useEffect, useState, useRef, useContext } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { Error, Check } from "@mui/icons-material";
import TextField from "@mui/material/TextField";
import "../styles/newsong.css";
import { Alert, Button, Select } from "@mui/material";
import { setSideBarData } from "../service";
import SidebarContext from "../SidebarContext";
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

function EditPlaylist() {
  const [imageUrl, setImageUrl] = useState("");
  const [loadImage, setLoadImage] = useState(false);
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
  const p = location.state;

  const [playlist, setPlaylist] = useState();
  const sPlaylist = [];
  const sidebar = useContext(SidebarContext);
  const [songId, setSongId] = useState(sPlaylist);
  useEffect(() => {
    if (p.id != null) {
      axios.get("http://localhost:8080/api/playlists/" + p.id).then((response) => {
        setPlaylist(response.data);
        if (songId.length === 0) {
          response.data.songPlaylist.map((child) => {
            sPlaylist.push(child.id);
          })
        }
      })
    }
  }, [p, playlist, sPlaylist, songId])

  const playlistNameRef = useRef();
  const [userId, setUserId] = useState(p.userId);
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
  const [remainImage, setRemainImage] = useState(false);
  const handleRemainImage = () => {
    setImageUrl(playlist.playlistImg);
    setLoadImage(true);
    setRemainImage(true);
  };
  const [songData, setSongData] = useState([]);
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:8080/api/songs").then((response) => {
      setSongData(response.data);
    });
    axios.get("http://localhost:8080/api/users").then((response) => {
      setUserData(response.data)
    })
  }, [userData, songData]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSongId(value);
  };
  useEffect(() => {
    if (loadImage) {
      setSuccess("File hình ảnh đã được tải lên.");
      setShowAlertSuccess(true);
      if (error === "File hình ảnh chưa được tải lên.") {
        setShowAlert(false);
      }
    }
  }, [loadImage, success, showAlertSuccess, showAlert]);
  const playlistHandler = () => {
    const playlistName = playlistNameRef.current.value;
    if (!playlistName) {
      return setAlertError("Vui lòng nhập đầy đủ thông tin!");
    }
    if (!loadImage && !remainImage) {
      return setAlertError("File hình ảnh chưa được tải lên.");
    }
    //sign in successfully
    setShowAlertSuccess(false);
    setError(null);
    setShowAlert(false);
    const playlistDetail = {
      playlistName: playlistName,
      playlistImg: imageUrl
    }
    axios.put("http://localhost:8080/api/playlists/" + p.id, playlistDetail).then((response) => {
      console.log(response.data)
      songId.map((child) => {
        axios.put("http://localhost:8080/api/playlists/" + p.id + "/song/" + child).then((result) => {
          console.log(result.data);
        })
      })
      if (userId !== p.userId) {
        axios.put("http://localhost:8080/api/playlists/" + p.id + "/user/" + userId).then((result) => {
          console.log(result.data);
        })
      }
      setSideBarData(navigate, sidebar);
    })
  };
  return (
    <div>
      {playlist &&
        <div className="newAlbum">
          <h1 className="newAlbumTitle">Chỉnh sửa playlist</h1>
          <form className="newAlbumForm" id="form-id">
            <div className="newAlbumItem">
              <label>Tên playlist</label>
              <TextField
                id="albumname"
                variant="outlined"
                inputRef={playlistNameRef}
                defaultValue={playlist.playlistName}
              />
            </div>
            <div className="newAlbumItem">
              <label>Người tạo</label>
              <FormControl>
                <Select
                  id="select_user" value={userId}
                  onChange={(e) => {
                    setUserId(e.target.value)
                  }}
                  MenuProps={MenuProps}
                >
                  {userData.map((child, index) => (
                    <MenuItem key={child.id} item={child} value={child.id}>
                      {child.userName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className="newAlbumItem">
              <label>Bài hát</label>
              <FormControl>
                <Select
                  id="select_artists"
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
                  Ảnh playlist
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
                onClick={playlistHandler}
                variant="contained"
                className="buttonAdd"
              >
                Cập nhật playlist
              </Button>
            </div>
          </form>
        </div>}
    </div>
  );
}

export default EditPlaylist;
