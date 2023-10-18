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
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import "../styles/malbum.css";
import { Link } from "react-router-dom";
import { DeleteOutline } from "@mui/icons-material";
import axios from "axios";

const MAlbum = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:8080/api/albums").then((response) => {
      setData(response.data);
    });
  }, [data])
  const [id, setId] = useState();
  const [open, setOpen] = useState(false);
  const handleDelete = (id) => {
    setOpen(true);
    setId(id);
    console.log(id)
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleYes = () => {
    axios.delete("http://localhost:8080/api/albums/ " + id).then((response) => {
      console.log(response.data);
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
      field: "image",
      headerName: "Ảnh",
      width: 100,

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
      width: 250,
      renderCell: (params) => {
        return (
          <div className="albumListAlbum" style={{ verticalAlign: "center", textOverflow: 'ellipsis' }}>
            {params.row.albumName}
          </div>
        );
      },
    },
    {
      field: "releaseDate",
      headerName: "Thời gian",
      width: 130,

      renderCell: (params) => {
        return (
          <div className="albumListAlbum" style={{ verticalAlign: "center" }}>
            {FormatDate(params.row.releaseDate)}
          </div>
        );
      },
    },
    {
      field: "artist",
      headerName: "Nghệ sĩ",
      width: 180,

      renderCell: (params) => {
        return (
          <div
            className="albumListArtist"
            style={{
              justifyContent: "space-around",
            }}
          >
            {params.row.artist.map((child, index) => {
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
        );
      },
    },
    {
      field: "country",
      headerName: "Nước",
      width: 100,

      renderCell: (params) => {
        return (
          <div className="albumListCountry" style={{ verticalAlign: "center" }}>
            <div>
              <span className="country">
                {params.row.country.countryName && <div>{params.row.country.countryName}</div>}
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
            <Link
              to={"/albumDetail/" + params.row.albumName}
              state={params.row.id}
            >
              <Button className="albumListBtn View" variant="contained">Xem</Button>
            </Link>

            <Link to={"/editAlbum/" + params.row.albumName} state={params.row}>
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
        <h1 className="title">Album</h1>
        <Link to="/newAlbum">
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
