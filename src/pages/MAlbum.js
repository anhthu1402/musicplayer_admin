import React, { useEffect, useMemo, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { DataGrid, gridClasses, GridToolbar } from "@mui/x-data-grid";
import { AlbumData } from "../components/AlbumData";
import SongItem from "../components/SongItem";
import "../styles/malbum.css";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { DeleteOutline, Edit, Delete } from "@mui/icons-material";

const MAlbum = () => {
  const [data, setData] = useState(AlbumData);
  const rows = AlbumData;
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
      width: 70,

      renderCell: (params) => {
        return (
          <div className="albumListAlbum" style={{ verticalAlign: "center" }}>
            <img
              className="albumListImg"
              src={params.row.albumImage}
              alt={params.row.albumName}
              width={70}
              height={70}
            />
          </div>
        );
      },
    },
    {
      field: "albumName",
      headerName: "Tên Album",
      width: 150,
      editable: true,
      renderCell: (params) => {
        return (
          <div className="albumListAlbum" style={{ verticalAlign: "center" }}>
            {params.row.albumName}
          </div>
        );
      },
    },
    {
      field: "releaseDate",
      headerName: "Thời gian",
      width: 150,

      renderCell: (params) => {
        return (
          <div className="albumListAlbum" style={{ verticalAlign: "center" }}>
            {params.row.releaseDate}
          </div>
        );
      },
    },
    {
      field: "artist",
      headerName: "Nghệ sĩ",
      width: 150,

      renderCell: (params) => {
        return (
          <div
            className="albumListArtist"
            style={{
              // display: "flex",
              // flexDirection: 'row',
              justifyContent: "space-around",
            }}
          >
            {params.row.artist.map((child, index) => {
              if (index < Object.keys(child).length - 1) {
                return (
                  <span key={index} item={child}>
                    {child.artistName} <text values=" "></text>
                  </span>
                );
              } else {
                return (
                  <span key={index} item={child}>
                    , <span> {child.artistName}</span>
                  </span>
                );
              }
            })}
          </div>
        );
      },
    },
    {
      field: "songs",
      headerName: "Bài hát",
      width: 200,

      renderCell: (params) => {
        return (
          <div
            className="songs"
            style={{
              // display: "flex",
              // flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            {params.row.songs.map((child, index) => {
              if (index < Object.keys(child).length - 1) {
                return (
                  <span key={index} item={child} className="songs">
                    {child.songName} <span values=" "></span>
                  </span>
                );
              } else {
                return (
                  <span key={index} item={child} className="songs">
                    <span>{child.songName}</span>
                  </span>
                );
              }
            })}
          </div>
        );
      },
    },
    {
      field: "country",
      headerName: "Nước",
      width: 80,

      renderCell: (params) => {
        return (
          <div className="albumListCountry" style={{ verticalAlign: "center" }}>
            <div>
              <span className="country">{params.row.country.countryName}</span>
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
            <Link to={"/albumDetail/" + params.row.albumName} state={params.row}>
                <button className="artistListView">View</button>
            </Link>
           
            <Link to={"/editAlbum/" + params.row.albumName} state={params.row}>
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
        <h1 className="title">Album</h1>
        <Link to="/newAlbum">
          <button className="albumButtton">
            {/* <span><AddIcon style={{size:'1rem'}}></AddIcon></span> */}
            <span>Thêm mới</span>
          </button>
        </Link>
      </div>
      <Box m="40px 0 0 0" height="75vh">
        <DataGrid
          rows={data}
          disableSelectionOnClick
          columns={columns}
          pageSize={8}
          initialState={{
            ...data.initialState,
            pagination: { paginationModel: { pageSize: 8 } },
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
        <DialogTitle id="alert-dialog-title">{"Xóa album"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn có chắc muốn xóa album này?
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
};

export default MAlbum;
