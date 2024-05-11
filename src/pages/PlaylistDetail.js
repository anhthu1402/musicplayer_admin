import "../styles/newalbum.css";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Button } from "@mui/material";
import { Avatar } from "antd";
import TrackItem from "../components/TrackItem";
import { setSideBarData } from "../service";
import SidebarContext from "../SidebarContext";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function PlaylistDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const playlistId = location.state;
  const [playlist, setPlaylist] = useState();
  const sidebar = useContext(SidebarContext);
  useEffect(() => {
    if (playlistId != null) {
      axios.get("http://localhost:9090/api/playlists/" + playlistId).then((response) => {
        setPlaylist(response.data);
      }).catch((error) => console.log(error))
    }
  })
  const [open, setOpen] = useState(false);
  const handleDelete = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleYes = () => {
    axios.delete("http://localhost:9090/api/playlists/" + playlistId).then((response) => {
      navigate("/playlists")
    }).catch((error) => console.log(error))
    setOpen(false);
    setSideBarData(navigate, sidebar);
  };
  return (
    <div className="Playlist">
      {playlist && <form className="PlaylistForm" id="form-id">
        <div className="PlaylistItem">
          <div style={{ display: "flex", flexDirection: 'row', justifyContent: 'space-between' }}>
            <div style={{ display: "flex", flexDirection: 'row', alignItems: 'center' }} >
              <Avatar
                src={playlist.playlistImg} alt={playlist.playlistName}
                style={{
                  width: "13vw",
                  height: "13vw",
                  marginRight: "2vw",
                }}
              />
              <div className="playlistInfo" style={{
                marginTop: "auto",
                marginBottom: "auto",
                fontSize: "1.5rem",
              }}>
                <h1 >{playlist.playlistName}</h1>
                <p style={{ fontSize: "1.2vw", color: "rgb(151, 150, 150)", paddingTop: "1vw" }}>Người tạo: {playlist.userName}</p>
              </div>
            </div>
            {playlist.userId === null &&
              <div style={{ display: "flex", flexDirection: 'row', justifyContent: 'space-between' }}>
                <Link to={"/playlists/edit/" + playlist.id} state={playlist}>
                  <Button className="albumButtton edit" sx={{ marginRight: '15px' }} variant="contained">
                    Chỉnh sửa
                  </Button>
                </Link>
                <div>
                  <Button onClick={handleDelete} className="albumButtton delete" variant="contained">
                    Xóa
                  </Button>
                </div>
              </div>}
          </div>
        </div>
        <div style={{
          fontSize: "2vw",
          marginBottom: "1vw",
          marginTop: "1vw",
          color: "rgb(151, 150, 150)",
        }}> <label>Các bài hát</label></div>
        {playlist.songPlaylist.map((child, index) => (
          <div className="song shadowDiv">
            <TrackItem key={index} item={child} />
          </div>
        ))}
        <div style={{ marginRight: 'auto', marginLeft: 'auto', textAlign: "center" }}>
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
      </form>}
    </div>
  );
}

export default PlaylistDetail;