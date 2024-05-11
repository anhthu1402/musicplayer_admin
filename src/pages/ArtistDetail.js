import "../styles/martist.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { Button, Box, Grid } from "@mui/material";
import { Avatar } from "antd";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TrackItem from "../components/TrackItem";
import { useContext } from "react";
import SidebarContext from "../SidebarContext";
import { setSideBarData } from "../service";
import ArtistAlbumItem from "../components/ArtistAlbumItem";

function ArtistDetail() {
  const location = useLocation();
  const artist = location.state;
  const navigate = useNavigate();
  const [songs, setSongs] = useState([]);
  const [albums, setAlbums] = useState([]);
  const sidebar = useContext(SidebarContext);
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (!loaded) {
      axios.get("http://localhost:9090/api/songs/representation/" + artist.id).then((response) => {
        setSongs(response.data);
      }).catch((error) => console.log(error))
      axios.get("http://localhost:9090/api/artists/" + artist.id + "/albums").then((response) => {
        setAlbums(response.data);
      }).catch((error) => console.log(error))
      setLoaded(true)
    }
  }, [songs, albums, artist.id, loaded])

  const [open, setOpen] = useState(false);
  const handleDelete = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleYes = () => {
    axios.delete("http://localhost:9090/api/artists/" + artist.id).then((response) => {
      navigate("/artists")
    }).catch((error) => console.log(error))
    setOpen(false);
    setSideBarData(navigate, sidebar);
  };
  return (
    <div className="Artist" style={{ marginBottom: '100px' }}>
      {artist && (
        <div>
          <form className="ArtistForm">
            <div className="ArtistItem">
              <div style={{ display: "flex", flexDirection: 'row', justifyContent: 'space-between' }}>
                <div style={{ display: "flex", flexDirection: 'row', alignItems: 'center' }}>
                  <Avatar
                    src={artist.artistImage}
                    alt={artist.artistName}
                    style={{
                      width: "13vw",
                      height: "13vw",
                      marginRight: "2vw",
                    }}
                  />
                  <div
                    style={{
                      marginTop: "auto",
                      marginBottom: "auto",
                      fontSize: "1.8rem",
                    }}
                  >
                    <h1>{artist.artistName}</h1>
                    <div>
                      <h4
                        style={{
                          fontSize: "1.2vw",
                          color: "rgb(151, 150, 150)",
                          paddingTop: "1vw",
                        }}
                      >
                        <span>{artist.numberOfFollower} người theo dõi</span>
                      </h4>
                    </div>
                  </div></div>
                <div style={{ display: "flex", flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Link to={"/artists/edit/" + artist.id} state={artist}>
                    <Button className="artistButton edit" sx={{ marginRight: '15px' }} variant="contained">
                      Chỉnh sửa
                    </Button>
                  </Link>
                  <div>
                    <Button onClick={handleDelete} className="artistButton delete" variant="contained">
                      Xóa
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div
              style={{
                fontSize: "1.2vw",
                marginBottom: "1.5vw",
                marginTop: "1vw",
              }}
            >
              <label
                style={{
                  fontSize: "2vw",
                  color: "rgb(151, 150, 150)",
                  paddingBottom: "1.5vw",
                }}
              >
                Giới thiệu
              </label>
              <p style={{ marginTop: '10px' }}>{artist.introduce}</p>
            </div>
            <div
              style={{
                fontSize: "2vw",
                marginBottom: "1vw",
                marginTop: "1vw",
                color: "rgb(151, 150, 150)",
              }}
            >
              <label>Albums</label>
            </div>
            <Box
              className="artistAlbums"
              sx={{ width: "100%", position: "relative" }}
            >
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2 }}
              >
                {albums.map(
                  (item, index) =>
                    <Grid item xs={3}>
                      <ArtistAlbumItem key={index} item={item} />
                    </Grid>
                )}
              </Grid>
            </Box>
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
            <div className="listSongs">
              {songs && songs.map((item, index) => (
                <div className="song shadowDiv" key={index}>
                  <TrackItem key={index} item={item} />
                </div>
              ))}
            </div>
            <div
              style={{
                marginRight: "auto",
                marginLeft: "auto",
                textAlign: "center",
              }}
            >
              <Button
                variant="contained"
                className="buttonAdd" onClick={() => {
                  setSideBarData(navigate, sidebar);
                }}
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
        </div>
      )}

    </div>
  );
}

export default ArtistDetail;
