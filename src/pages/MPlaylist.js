import React, { useState } from "react";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import "../styles/malbum.css";
import { Link } from "react-router-dom";
import { DeleteOutline } from "@mui/icons-material";
import { PlaylistData } from "../components/PlaylistData";
import { Button } from "antd";

function MPlaylist() {
  const [data, setData] = useState(PlaylistData);
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
    //hàm xóa ở đây
    console.log(id);
    setData(data.filter((item) => item.id !== id));
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
          <div className="albumListAlbum" style={{ verticalAlign: "center" }}>
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
      width: 200,
      renderCell: (params) => {
        return (
          <div className="albumListAlbum" style={{ verticalAlign: "center" }}>
            {params.row.playlistName}
          </div>
        );
      },
    },
    {
      field: "songs",
      headerName: "Bài hát",
      width: 450,

      renderCell: (params) => {
        return (
          <div
            className="songs"
            style={{
              justifyContent: "space-around",
            }}
          >
            {params.row.songPlaylist.map((child, index) => {
              if (index < Object.keys(child).length - 1) {
                return (
                  <span key={index} item={child} className="songs">
                    {child.songName}
                  </span>
                );
              }
            })}
          </div>
        );
      },
    },
    {
      field: "user",
      headerName: "Người tạo",
      width: 100,

      renderCell: (params) => {
        return (
          <div className="albumListCountry" style={{ verticalAlign: "center" }}>
            <div>
              <span className="country">{params.row.user}</span>
            </div>
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <>
            <Link
              to={"/playlistDetail/" + params.row.playlistName}
              state={params.row}
            >
              <button className="artistListView">View</button>
            </Link>
            <Link
              to={"/editPlaylist/" + params.row.playlistName}
              state={params.row}
            >
              <button className="albumListEdit">Edit</button>
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
          <button className="albumButtton">
            <span>Thêm mới</span>
          </button>
        </Link>
      </div>
      <Box m="40px 0 0 0">
        <DataGrid
          rows={data}
          disableSelectionOnClick
          columns={columns}
          pageSize={10}
          initialState={{
            ...data.initialState,
            pagination: { paginationModel: { pageSize: 10 } },
          }}
          checkboxSelection
          components={{ Toolbar: GridToolbar }}
          selectedGridRowsCountSelector={handleDelete}
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
