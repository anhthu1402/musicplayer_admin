import { useEffect } from "react";
import "../styles/newsong.css";
import { ArtistsData } from "./ArtistsData";
function NewSong() {
  async function uploadFile(file) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 't1pu4dpc');
    formData.append('cloud_name', 'dccswqs2m');
    const res = await fetch(
      'https://api.cloudinary.com/v1_1/dccswqs2m/upload',
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
  return (
    <div className="newSong" >
      <h1 className="newSongTitle">Thêm bài hát mới</h1>
      <form className="newSongForm" id="form-id" action="~/admin/Ql_BaiHat/ThemBaiHat" method="POST">
        <div className="newSongItem">
          <label>Tên bài hát</label>
          <input type="text" placeholder="" />
        </div>
        <div className="newSongItem">
          <label>Người trình bày</label>
          <select className="newSongSelect" name="active" id="active" multiple={3}>
                {ArtistsData.map((child,index)=>{
                                return (
                                  <option key={index} item={child} value= {child.artistName}>
                                    {child.artistName}
                                  </option>
                );})}
          </select>
        </div>
        <div className="newSongItem">
          <label asp-for="LOIBAIHAT" class="control-label">Lời bài hát</label>
          <textarea asp-for="LOIBAIHAT" class="form-control" id="LOIBAIHAT" name="LOIBAIHAT" rows="4" cols="50"></textarea>
          <span asp-validation-for="LOIBAIHAT" class="text-danger"></span>
        </div>
        <div className="newSongItem">
          <label asp-for="THOILUONG" class="control-label">Thời lượng bài hát</label>
          <input asp-for="THOILUONG" class="form-control" id="THOILUONG" name="THOILUONG" />
          <span asp-validation-for="THOILUONG" class="text-danger"></span>
        </div>
        
        <div className="newSongLink">
          <label asp-for="LINKBH" class="control-label">Link bài hát</label>
          <input hidden asp-for="LINKBH" type="text" value="nhac" id="linkNhac" name="LINKBH" />
          <input type="file" id="linkaudio" />
          <span asp-validation-for="LINKBH" class="text-danger"></span>
        </div>
        <div class="newSongLink">
          <label asp-for="ANHBH" class="control-label">Ảnh bài hát</label>
          <input hidden asp-for="ANHBH"  type="text" value="anh" id="linkanhBH" name="ANHBH" />
          <input type="file" id="linkimage" />
          <span asp-validation-for="ANHBH" class="text-danger"></span>
        </div>
        <div class="newSongLink">
          <label asp-for="LINKANHPN" class="control-label">Link ảnh khi phát nhạc</label>
          <input hidden asp-for="LINKANHPN"  type="text" value="anhPN" id="linkanhBHPN" name="LINKANHPN" />
          <input type="file" id="linkimagephatnhac" />
          <span asp-validation-for="LINKANHPN" class="text-danger"></span>
        </div>
        <div class="form-group">
                <input type="submit" name="submit" value="Create" class="btn btn-primary" />
        </div>
      </form>
    </div>
  );
}

export default NewSong