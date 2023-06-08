import React from "react";
import axios from "axios";
import { useState } from "react";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArtistsData } from "./ArtistsData";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Error, PersonRounded } from "@mui/icons-material";
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import { SongData } from "./SongData";
import "../styles/upload.css"

function UpLoadSong() {
  const [audioUrl, setAudioUrl] = useState("");
  const [timeLimit, setTimeLimit] = useState(0);
  const [imageUrl, setImageUrl] = useState("");
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
  const artistnameRef = useRef();
  const navigate = useNavigate();
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
  const [personName, setPersonName] = React.useState(SongData);
  // const handleChange = (event: SelectChangeEvent<typeof personName>) => {
  //   const {
  //     target: { value },
  //   } = event;
  //   setPersonName(
  //     // On autofill we get a stringified value.
  //     typeof value === 'string' ? value.split(',') : value,
  //   );
  // };
  const [error, setError] = useState(null);
  const [showAlert, setShowAlert] = useState(error !== null ? true : false);
  const setAlertError = (error) => {
    setError(error);
    setShowAlert(true);
  };
  const songHandler = () => {
    const songName = songnameRef.current.value;
    const artistName = artistnameRef.current.value;

    if (!songName || !artistName) {
      return setAlertError("Vui lòng nhập đầy đủ thông tin!");
    }
    //sign in successfully
    setError(null);
    setShowAlert(false);
    navigate("/songs");
  };

  return (
    <div className="newSong">
      <h1>Thêm bài hát</h1>
      <form className="newSongForm" id="form-id" action="~/admin/Ql_BaiHat/ThemBaiHat" method="POST">
          <div className="form-group">
            <label>Tên bài hát</label>
            <TextField id="songname" label="Tên bài hát" variant="outlined" inputRef={songnameRef}/>
          </div>
          <div className="form-group">
            <label>Tên nghệ sĩ</label>
              <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              value={ArtistsData.artistName}
              // onChange={handleChange}
              input={<OutlinedInput label="Tag" />}
              renderValue={(selected) => selected.join(', ')}
              MenuProps={MenuProps}
              >
              {ArtistsData.map((child,index) => (
                <MenuItem key={index} item={child}>
                  <Checkbox checked={index < Object.keys(child).length - 1} />
                  <ListItemText primary={ArtistsData.artistName} />
                </MenuItem>
              ))}
            </Select>
            {/* <TextField
              id="artistname"
              select
              label="Select"
              // defaultValue="None"
              helperText="Chọn nghệ sĩ"
            >
              {ArtistsData.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.artistName}
                </MenuItem>
              ))}
            </TextField> */}
          </div>
          <div className="form-group">
              <label>Lời bài hát</label>
              <TextField
              id="standard-multiline-static"
              label="Multiline"
              multiline
              rows={4}
              variant="standard"
            />
          </div>
          <div className="form-group">
            <h1>Upload bài hát</h1>
            <input type="file" onChange={processFileAudio} />
            <input type="file" onChange={processFileImage} />
          </div>
          <input
            type="button"
            name="submit"
            className="submit"
            value={`Thêm`}
            onClick={songHandler}
          />
      </form>
      
    </div>
  );
}

export default UpLoadSong