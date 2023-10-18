import React, { useState } from "react";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import "../styles/malbum.css";
import { Link } from "react-router-dom";
import { DeleteOutline } from "@mui/icons-material";
import axios from "axios";
import { useEffect } from "react";

function MPlaylist() {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:8080/api/playlists").then((response) => {
      setData(response.data);
    })
  }, [data])
  const [id, setId] = useState();
  const [open, setOpen] = useState(false);
  const handleDelete = (id) => {
    setOpen(true);
    setId(id);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleYes = () => {
    axios.delete("http://localhost:8080/api/playlists/ " + id).then((response) => {
      console.log(response.data);
    })
    setOpen(false);
  };
  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 50,
    },
    {
      field: "image",
      headerName: "Ảnh",
      width: 100,

      renderCell: (params) => {
        return (
          <div className="albumListAlbum" style={{ display: 'flex', alignItems: 'center' }}>
            <img
              className="albumListImg"
              src={params.row.playlistImg}
              alt={params.row.playlistName}
              width={70}
              height={70}
            />
          </div>
        );
      },
    },
    {
      field: "albumName",
      headerName: "Tên Playlist",
      width: 250,
      renderCell: (params) => {
        return (
          <div className="albumListAlbum">
            {params.row.playlistName}
          </div>
        );
      },
    },
    {
      field: "user",
      headerName: "Người tạo",
      width: 150,

      renderCell: (params) => {
        return (
          <div className="albumListCountry" >
            <div>
              <span className="country">{params.row.userName}</span>
            </div>
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "Hành động",
      width: 200,
      renderCell: (params) => {
        return (
          <>
            <Link
              to={"/playlistDetail/" + params.row.playlistName}
              state={params.row.id}
            >
              <Button className="albumListBtn View" variant="contained">Xem</Button>
            </Link>
            <Link
              to={"/editPlaylist/" + params.row.playlistName}
              state={params.row}
            >
              <Button className="albumListBtn Edit" variant="contained">Sửa</Button>
            </Link>
            <DeleteOutline
              className="albumListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];
  return (
    <div className="albumList">
      <div className="button">
        <h1 className="title">Playlist</h1>
        <Link to="/newPlaylist">
          <Button className="albumButtton" variant="contained">
            Thêm mới
          </Button>
        </Link>
      </div>
      <Box m="40px 0 0 0">
        <DataGrid
          rows={data}
          columns={columns}
          pageSize={10}
          initialState={{
            ...data.initialState,
            pagination: { paginationModel: { pageSize: 10 } },
          }}
          checkboxSelection
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth={"lg"}
      >
        <DialogTitle id="alert-dialog-title">{"Xóa playlist"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn có chắc muốn xóa playlist này?
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
  );
}

export default MPlaylist;
