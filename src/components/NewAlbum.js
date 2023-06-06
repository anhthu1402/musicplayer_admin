import "../styles/newalbum.css";
import { ArtistsData } from "./ArtistsData";
import { SongData } from "./SongData";

function NewAlbum() {
  return (
    <div className="newAlbum" >
      <h1 className="newAlbumTitle">Thêm Album mới</h1>
      <form className="newAlbumForm" id="form-id">
        <div className="newAlbumItem">
          <label>Tên Album</label>
          <input type="text" placeholder="" />
        </div>
        <div className="newAlbumItem">
          <label>Tên bài hát</label>
          <select className="newAlbumSelect" name="active" id="active">
                {SongData.map((child,index)=>{
                                return (
                                  <option key={index} item={child}>
                                    {child.songName}
                                  </option>
                );})}
          </select>
        </div>
        <div className="newAlbumItem">
          <label>Tên nghệ sĩ</label>
          <select className="newSongSelect" name="active" id="active" multiple={3}>
                {ArtistsData.map((child,index)=>{
                                return (
                                  <option key={index} item={child}>
                                    {child.artistName}
                                  </option>
                );})}
          </select>
        </div>
        <div class="form-group">
                <input type="submit" name="submit" value="Create" class="btn btn-primary" />
        </div>
      </form>
    </div>
  );
}

export default NewAlbum
