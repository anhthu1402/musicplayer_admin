import "../styles/malbum.css";
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { Avatar } from "antd";
import TrackItem from "../components/TrackItem";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import SidebarContext from "../SidebarContext";
import { setSideBarData } from "../service";

function AlbumDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const id = location.state;
  const [album, setALbum] = useState();
  const [artists, setArtists] = useState([]);
  const [songs, setSongs] = useState([]);
  const [date, setDate] = useState();
  const sidebar = useContext(SidebarContext);

  useEffect(() => {
    axios.get("http://localhost:8080/api/albums/" + id).then((response) => {
      setALbum(response.data);
    })
    if (album != null) {
      setArtists(album.artist);
      setSongs(album.songs);
      setDate(dayjs(FormatDate(album.releaseDate)))
    }
  }, [album, artists, songs]);

  const [open, setOpen] = useState(false);
  const handleDelete = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleYes = () => {
    axios.delete("http://localhost:8080/api/albums/" + album.id).then((response) => {
      console.log(response);
    })
    setOpen(false);
    setSideBarData(navigate, sidebar);
  };

  function FormatDate(string) {
    var options = { year: "numeric", month: "numeric", day: "numeric" };
    return new Date(string).toLocaleDateString([], options);
  }
  return (
    <div className="Album">
      {album && <div>
        <form className="AlbumForm" id="form-id">
          <div className="AlbumItem">
            <div style={{ display: "flex", flexDirection: 'row', justifyContent: 'space-between' }}>
              <div style={{ display: "flex", flexDirection: 'row', alignItems: 'center' }}>
                <Avatar
                  src={album.albumImage}
                  alt={album.albumName}
                  style={{
                    width: "13vw",
                    height: "13vw",
                    marginRight: "2vw",
                  }}
                />
                <div
                  className="albumInfo"
                  style={{
                    marginTop: "auto",
                    marginBottom: "auto",
                    fontSize: "1.5rem",
                  }}
                >
                  <h1>{album.albumName}</h1>
                  <div
                    className="albumListArtist"
                  >
                    {artists.map((child, index) => {
                      if (index < Object.keys(child).length - 1) {
                        return (
                          <span key={index} item={child}>
                            <Link
                              to={`/artistDetail/${child.artistName}`}
                              state={child}
                              style={{ color: "black", textDecoration: "none" }}
                            >
                              {child.artistName}
                            </Link>
                          </span>
                        );
                      }
                    })}
                  </div>
                  <p
                    style={{
                      fontSize: "1.2vw",
                      color: "rgb(151, 150, 150)",
                      paddingTop: "1vw",
                    }}
                  >
                    {" "}
                    Ngày phát hành: {FormatDate(date)}
                  </p>

                  <p
                    style={{
                      fontSize: "1.2vw",
                      color: "rgb(151, 150, 150)",
                      paddingTop: "1vw",
                    }}
                  >
                    {album.interestTimes} người yêu thích
                  </p>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: 'row', justifyContent: 'space-between' }}>
                <Link to={"/editAlbum/" + album.albumName} state={album}>
                  <Button className="albumButtton edit" sx={{ marginRight: '15px' }} variant="contained">
                    Chỉnh sửa
                  </Button>
                </Link>
                <div>
                  <Button onClick={handleDelete} className="albumButtton delete" variant="contained">
                    Xóa
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              fontSize: "2vw",
              marginBottom: "1vw",
              marginTop: "1vw",
              color: "rgb(151, 150, 150)",
            }}
          >
            <label>Các bài hát</label>
          </div>
          {songs.map((child, index) => (
            <div className="song shadowDiv">
              <TrackItem key={index} item={child} />
            </div>
          ))}

          <div
            style={{
              marginRight: "auto",
              marginLeft: "auto",
              textAlign: "center",
            }}
          >
            <Button
              onClick={() => {
                setSideBarData(navigate, sidebar);
              }}
              variant="contained"
              className="buttonAdd"
            >
              Quay về
            </Button>
          </div>
        </form>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-delete-title"
          aria-describedby="alert-delete-description"
          maxWidth={"lg"}
        >
          <DialogTitle id="alert-delete-title">{"Xóa nghệ sĩ"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-delete-description">
              Bạn có chắc muốn xóa nghệ sĩ này?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Không</Button>
            <Button onClick={handleYes} autoFocus>
              Xóa
            </Button>
          </DialogActions>
        </Dialog>
      </div>}
    </div>
  );
}

export default AlbumDetail;
