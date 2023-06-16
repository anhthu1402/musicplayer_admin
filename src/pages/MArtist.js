import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import { ArtistsData } from "../components/ArtistsData";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Modal } from "../components/Modal";
import "../styles/martist.css";
import { DeleteOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const MArtist = () => {
  const [data, setData] = useState(ArtistsData);
  const rows = ArtistsData;
  const [showData, setShowData] = useState(ArtistsData);
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
      width: 100,
    },
    {
      field: "image",
      headerName: "Hình ảnh",
      width: 200,

      renderCell: (params) => {
        return (
          <div style={{ alignItems: "center" }}>
            <img
              className="artistListImg"
              src={require("../assets/" + params.row.artistImage)}
              alt={params.row.artistName}
              width={70}
              height={70}
            />
          </div>
        );
      },
    },
    {
      field: "name",
      headerName: "Nghệ sĩ",
      width: 250,
      editable: true,
      renderCell: (params) => {
        return <div className="artistListArtist">{params.row.artistName}</div>;
      },
    },
    {
      field: "follower",
      headerName: "Người theo dõi",
      width: 200,

      renderCell: (params) => {
        return (
          <div className="artistListFollow">{params.row.numberOfFollower}</div>
        );
      },
    },

    {
      field: "action",
      headerName: "Action",
      width: 300,
      renderCell: (params) => {
        return (
          <>
            <Link  to={"/artistDetail/" + params.row.albumName} state={params.row}>
              <button
                className="artistListView"
                // onClick={(handleClickOpens, selectRow) =>
                //   setShowData({
                //     fimage: selectRow.imageArtist,
                //     fname: selectRow.nameArtist,
                //     ffolow: selectRow.numberOfFollower,
                //   })
                // }
              >
                View
              </button>
            </Link>

            <Link to={"/editArtist/" + params.row.albumName} state={params.row}>
              <button className="artistListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="artistListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];
  return (
    <div className="artistList">
      <div className="button">
        <h1 className="title">Nghệ sĩ</h1>
        <Link to="/newArtist">
          <button className="artistButtton">
            {/* <span><AddIcon style={{size:'1rem'}}></AddIcon></span> */}
            <span>Thêm mới</span>
          </button>
        </Link>
      </div>
      <div>
        <Box m="40px 0 0 0" height="75vh">
          <DataGrid
            rows={data}
            disableSelectionOnClick
            columns={columns}
            // getRowId={(row) => row._id}
            rowsPerPageOptions={[5]}
            initialState={{
              ...data.initialState,
              pagination: { paginationModel: { pageSize: 8 } },
            }}
            pageSize={8}
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
          <DialogTitle id="alert-dialog-title">{"Xóa nghệ sĩ"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
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
    </div>
  );
};

export default MArtist;
