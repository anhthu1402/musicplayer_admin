import "../styles/newartist.css";
import "../styles/newsong.css";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { Error, Check } from "@mui/icons-material";
import TextField from "@mui/material/TextField";
import "../styles/newsong.css";
import { Alert, Backdrop, Button, CircularProgress } from "@mui/material";

function EditArtist() {
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
  const artist = location.state;

  const artistNameRef = useRef();
  const artistFollowersRef = useRef();
  const introduceRef = useRef();
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
    setImageUrl(artist.artistImage);
    setLoadImage(true);
    setRemainImage(true);
  };
  useEffect(() => {
    if (loadImage) {
      setSuccess("File hình ảnh đã được tải lên.");
      setShowAlertSuccess(true);
      setShowAlert(false);
    }
  }, [loadImage, success, showAlertSuccess, showAlert]);
  const [open, setOpen] = useState(false);
  const artistHandle = () => {
    const artistName = artistNameRef.current.value;
    const introduce = introduceRef.current.value;
    const artistFollowers = artistFollowersRef.current.value;
    if (!artistName || !introduce || !artistFollowers) {
      return setAlertError("Vui lòng nhập đầy đủ thông tin!");
    }
    if (!loadImage && !remainImage) {
      return setAlertError("File hình ảnh chưa được tải lên.");
    }
    if (isNaN(artistFollowers)) {
      return setAlertError("Số người theo dõi phải là một số!");
    }
    //sign in successfully
    setOpen(true);
    setError(null);
    setShowAlert(false);
    const artistDetail = {
      artistImage: imageUrl,
      artistName: artistName,
      introduce: introduce,
      numberOfFollower: artistFollowers
    }
    axios.put("http://localhost:9090/api/artists/" + artist.id, artistDetail).then((response) => {
      navigate("/artists");
    }).catch((error) => console.log(error))
  };
  return (
    <div className="newArtist">
      <h1 className="newArtistTitle">Chỉnh sửa nghệ sĩ</h1>
      <form className="newArtistForm">
        <div className="newArtistItem">
          <label htmlFor="artistName">Tên nghệ sĩ</label>
          <TextField
            id="artistName"
            variant="outlined"
            defaultValue={artist.artistName}
            inputRef={artistNameRef}
          />
        </div>
        <div className="newArtistItem">
          <label>Giới thiệu</label>
          <TextField
            variant="outlined"
            inputRef={introduceRef}
            defaultValue={artist.introduce}
            multiline
            rows={6}
          />
        </div>
        <div className="newArtistItem">
          <label htmlFor="artistFollowers">Số người theo dõi</label>
          <TextField
            id="artistFollowers"
            variant="outlined"
            defaultValue={artist.numberOfFollower}
            inputRef={artistFollowersRef}
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
              Ảnh nghệ sĩ
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
            onClick={artistHandle}
            variant="contained"
            className="buttonAdd"
          >
            Cập nhật nghệ sĩ
          </Button>
        </div>
      </form>
      <Backdrop sx={{ color: "#fff", zIndex: 10 }} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

export default EditArtist;
