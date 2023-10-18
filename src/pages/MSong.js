import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import {
  DataGrid,
  GridToolbar,
} from "@mui/x-data-grid";
import "../styles/msong.css";
import { Link } from "react-router-dom";
import { DeleteOutline } from "@mui/icons-material";
import axios from "axios";

const MSong = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:8080/api/songs").then((response) => {
      setData(response.data);
    })
  })
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
    axios.delete("http://localhost:8080/api/songs/" + id).then((response) => {
      console.log(response.data)
    })
    setOpen(false);
  };
  function FormatDate(string) {
    var options = { year: "numeric", month: "numeric", day: "numeric" };
    return new Date(string).toLocaleDateString([], options);
  }

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 50,
    },
    {
      field: "songImage",
      headerName: "Ảnh",
      width: 100,

      renderCell: (params) => {
        return (
          <div className="songListSong" style={{ display: 'flex', alignItems: 'center' }}>
            <img
              className="songListImg"
              src={params.row.songImage}
              alt={params.row.songName}
              width={70}
              height={70}
            />
          </div>
        );
      },
    },
    {
      field: " songName",
      headerName: "Tên bài hát",
      width: 280,
      renderCell: (params) => {
        return (
          <div style={{ textOverflow: 'ellipsis' }}>
            {params.row.songName}
          </div>
        );
      },
    },
    {
      field: "releaseDate",
      headerName: "Thời gian",
      width: 100,

      renderCell: (params) => {
        return (
          <div className="songListSong" style={{ verticalAlign: "center" }}>
            {FormatDate(params.row.releaseDate)}
          </div>
        );
      },
    },
    {
      field: "representation",
      headerName: "Nghệ sĩ",
      width: 230,

      renderCell: (params) => {
        return (
          <div className="songListArtist" style={{
            justifyContent: "space-around",
          }}
          >
            {params.row.representation.map((child, index) => {
              if (index < Object.keys(child).length - 1) {
                return (
                  <span key={index} item={child}>
                    <Link
                      to={`/artistDetail/${child.artistName}`}
                      state={child}
                      style={{
                        color: "black", textDecoration: "none",
                      }}
                    >
                      {child.artistName}
                    </Link>
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
      width: 120,

      renderCell: (params) => {
        return (
          <div className="albumListCountry" style={{ verticalAlign: "center" }}>
            <div>
              <span className="country">
                <div>{params.row.country && params.row.country.countryName}</div>
              </span>
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
            <Link to={"/editSong/" + params.row.songName} state={params.row}>
              <Button className="songListBtn Edit" variant="contained">Sửa</Button>
            </Link>
            <DeleteOutline
              className="songListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];
  return (
    <div className="songList">
      <div className="button">
        <h1 className=" songName">Bài hát</h1>
        <Link to={"/newsong"}>
          <Button className="songButtton" variant="contained">
            Thêm mới
          </Button>
        </Link>
      </div>
      <Box m="40px 0 0 0">
        <DataGrid
          rows={data}
          columns={columns}
          initialState={{
            ...data.initialState,
            pagination: { paginationModel: { pageSize: 10 } },
          }}
          pageSize={10}
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
        <DialogTitle id="alert-dialog-title">{"Xóa bài hát"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn có chắc muốn xóa bài hát này?
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

export default MSong;
