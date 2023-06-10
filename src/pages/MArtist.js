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
  const [opens, setOpens] = React.useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [rowToEdit, setRowToEdit] = useState(null);
  const handleCloses = () => {
    setOpens(false);
  };
  const handleDelete = (id) => {
    alert("Bạn chắc chắn xóa");
    setData(data.filter((item) => item.id !== id));
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
            <Link to={`/artistDetail/${params.artistName}`} state={params.id}>
              <button
                className="artistListView"
                onClick={(handleClickOpens, selectRow) =>
                  setShowData({
                    fimage: selectRow.imageArtist,
                    fname: selectRow.nameArtist,
                    ffolow: selectRow.numberOfFollower,
                  })
                }
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
            // onRowSelectionModelChange={(data)=>{console.log(data);}}
            selectedGridRowsCountSelector={handleDelete}
          />
        </Box>

        <Dialog
          open={opens}
          onClose={handleCloses}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          maxWidth={"lg"}
        >
          <DialogTitle id="alert-dialog-title">
            {"View Artist Data"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <table
                id="viewTable"
                style={{ border: "1px solid black", width: "800px" }}
              >
                <thead>
                  <tr>
                    <th>Ảnh</th>
                    <th>Tên nghệ sĩ</th>
                    <th>Lượt theo dõi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>{showData.fimage}</th>
                    <th>{showData.fname}</th>
                    <th>{showData.ffolow}</th>
                  </tr>
                </tbody>
              </table>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloses}>Disagree</Button>
            <Button onClick={handleCloses} autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default MArtist;
