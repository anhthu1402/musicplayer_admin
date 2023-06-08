import { useEffect } from "react";
import "../styles/newsong.css";
import { ArtistsData } from "./ArtistsData";
import React from "react";
import axios from "axios";
import { useState } from "react";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
// import Select, { SelectChangeEvent } from '@mui/material/Select';
import Select from 'react-select';
import { Error, PersonRounded } from "@mui/icons-material";
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import { SongData } from "./SongData";
import "../styles/newsong.css"
import { MultiSelect } from "react-multi-select-component";
function NewSong() {
  async function uploadFile(file) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'UIT-music-player');
    formData.append('cloud_name', 'ddtjntpxe');
    const res = await fetch(
      'https://api.cloudinary.com/v1_1/ddtjntpxe/upload',
      {
        method: 'POST',
        body: formData,
      }
    );
    const data = await res.json();
    return data;
  }
  var LINKBH;
  var ANHBH;
  var LINKANHPN;
 
  window.addEventListener("DOMContentLoaded", (event) => {
    const audio = document.getElementById('linkaudio');
    if (audio) {
      audio.addEventListener('change', (e) => {
        e.preventDefault();
        Array.from(e.target.files).forEach(async (file) => {
          if (file.size <= 52428800) {
            const data = await uploadFile(file);
            LINKBH = data.url;
            document.getElementById('linkNhac').value = LINKBH;
            console.log(document.getElementById('linkNhac').value);
          } else {
            alert('Size of this file is so big!!');
          }
        });
      }, false);
    }
});
  window.addEventListener("DOMContentLoaded", (event) => {
    const image = document.getElementById('linkimage');
    if (image) {
      image.addEventListener('change', (e) => {
        e.preventDefault();
        Array.from(e.target.files).forEach(async (file) => {
          if (file.size <= 52428800) {
                const data = await uploadFile(file);
                ANHBH = data.url;
                document.getElementById('linkanhBH').value = ANHBH;
                  console.log(document.getElementById('linkanhBH').value);
          } else {
            alert('Size of this file is so big!!');
          }
        });
      },false);
    }
  });
  window.addEventListener("DOMContentLoaded", (event) => {
    const imagePN = document.getElementById('linkimagephatnhac');
    if (imagePN) {
      imagePN.addEventListener('change', (e) => {
        e.preventDefault();
        Array.from(e.target.files).forEach(async (file) => {
            if (file.size <= 52428800) {
                const data = await uploadFile(file);
                console.log(data.url);
                LINKANHPN = data.url;
                document.getElementById('linkanhBHPN').value = LINKANHPN;
                console.log(document.getElementById('linkanhBHPN').value);
            } else {
                alert('Size of this file is so big!!');
            }
        });
    },false);
  }});
  window.addEventListener("DOMContentLoaded", (event) => {
    const form = document.getElementById('form-id');
    if (form) {
      form.addEventListener('submit', (e) => {
        //e.preventDefault();
        console.log(e);
      },false);
    }
  });

  
 
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
  const [data, setdata] = useState(ArtistsData);
  const songnameRef = useRef();
  const artistnameRef = useRef();
  const loibaihatRef =useRef();
  const thoiluongRef =useRef();
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
  // function getStyles(name: string, personName: readonly string[], theme: Theme) {
  //   return {
  //     fontWeight:
  //       personName.indexOf(name) === -1
  //         ? theme.typography.fontWeightRegular
  //         : theme.typography.fontWeightMedium,
  //   };
  // }
  const [personName, setPersonName] = React.useState(ArtistsData);
  // const handleChange = (event) => {
  //   const {
  //     target: { value },
  //   } = event;
  //   setPersonName(
  //     // On autofill we get a stringified value.
  //     typeof value === 'string' ? value.split(',') : value,
  //   );
  // };
  const [selected, setSelected] = useState(ArtistsData);
  const [error, setError] = useState(null);
  const [showAlert, setShowAlert] = useState(error !== null ? true : false);
  const setAlertError = (error) => {
    setError(error);
    setShowAlert(true);
  };
  const handleSubmit = async(e) => {
    e.preventDefault()
    let selected = [...recipeRef.current.options]
                .filter(option => option.selected)
                .map(option => option.value)
    console.log(new Date(), ' recipeType: ', selected)
    console.log(new Date(), 'with ref: ', [...recipeRef.current.options]);
    [...recipeRef.current.options].map(option => console.log(option,'; ',option.current.selected))
    console.log([...recipeRef.current.options].filter(option => option.selected))
    console.log([...recipeRef.current.options].filter(option=>option.selected).map(option => option.value))
  }
  const recipeRef = useRef();
  const songName = songnameRef.current.value;
  const artistName = artistnameRef.current.value;
  const loibaihat = loibaihatRef.current.value;
  const thoiluong = thoiluongRef.current.value;
  const songHandler = () => {
    
    // const names= [{ArtistsData.artistName}];
    if (!songName || !artistName) {
      return setAlertError("Vui lòng nhập đầy đủ thông tin!");
    }
    //sign in successfully
    setError(null);
    setShowAlert(false);
    navigate("/songs");
  };
  const name = data.artistName;
  return (
    <div className="newSong" >
      <h1 className="newSongTitle">Thêm bài hát mới</h1>
      <form className="newSongForm" id="form-id" action="~/admin/Ql_BaiHat/ThemBaiHat" method="POST" onSubmit={handleSubmit}>
        <div className="newSongItem">
          <label>Tên bài hát</label>
          <TextField id="songname" label="Tên bài hát" variant="outlined" inputRef={songnameRef}/>
          {/* <input type="text" placeholder="" /> */}
        </div>
        <div className="newSongItem">
          <label>Người trình bày</label>
          <select name="artistname" id="recipeType" ref={recipeRef} multiple={true} size={3}> {/* Step 2 - Add the reference to `select` element */}
            {ArtistsData.map((child,index)=>{
                                  return (
                                  <option key={index} item={child} value={child.artistName}>
                                    {child.artistName}
                                  </option>
            );})}
          </select>
          {/* <MultiSelect
            options={data}
            
            onChange={setSelected}
            labelledBy="Select"
          /> */}
          {/* <Select
            // defaultValue=""
            isMulti
            options={name}
            name="colors"
            className="basic-multi-select"
            classNamePrefix="select"
          /> */}

          {/* <Select
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
            </Select> */}
        </div>
        <div className="newSongItem">
          <label asp-for="LOIBAIHAT" class="control-label">Lời bài hát</label>
          {/* <textarea asp-for="LOIBAIHAT" class="form-control" id="LOIBAIHAT" name="LOIBAIHAT" rows="6" cols="50"></textarea> */}
          <TextField
              id="outlined-multiline-static"
              label="Lời bài hát"
              multiline
              rows={4}
              defaultValue=""
              inputRef={loibaihatRef}
            />
          <span asp-validation-for="LOIBAIHAT" class="text-danger"></span>
        </div>
        <div className="newSongItem">
          <label asp-for="THOILUONG" class="control-label">Thời lượng bài hát</label>
          {/* <input asp-for="THOILUONG" class="form-control" id="THOILUONG" name="THOILUONG" /> */}
          <TextField id="THOILUONG" label="Thời lượng" variant="outlined" inputRef={thoiluongRef}/>
          <span asp-validation-for="THOILUONG" class="text-danger"></span>
        </div>
        
        <div className="newSongLink">
          <label asp-for="LINKBH" class="control-label">Link bài hát</label>
          <input hidden asp-for="LINKBH" type="text" value="nhac" id="linkNhac" name="LINKBH" />
          <input type="file" id="linkaudio" onChange={processFileAudio}/>
          <span asp-validation-for="LINKBH" class="text-danger"></span>
        </div>
        <div class="newSongLink">
          <label asp-for="ANHBH" class="control-label">Ảnh bài hát</label>
          <input hidden asp-for="ANHBH"  type="text" value="anh" id="linkanhBH" name="ANHBH" />
          <input type="file" id="linkimage"  onChange={processFileImage}/>
          <span asp-validation-for="ANHBH" class="text-danger"></span>
        </div>
        <div class="newSongLink">
          <label asp-for="LINKANHPN" class="control-label">Link ảnh khi phát nhạc</label>
          <input hidden asp-for="LINKANHPN"  type="text" value="anhPN" id="linkanhBHPN" name="LINKANHPN" />
          <input type="file" id="linkimagephatnhac"  onChange={processFileImage} />
          <span asp-validation-for="LINKANHPN" class="text-danger"></span>
        </div>
        <div class="form-group">
          <input
              type="button"
              name="submit"
              class="submit"
              value={`Submit`}
              onClick={songHandler}
            />
        </div>
      </form>
    </div>
  );
}

export default NewSong