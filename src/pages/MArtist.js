import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import "../styles/martist.css";
import { DeleteOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import { useEffect } from "react";

const MArtist = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:9090/api/artists").then((response) => {
      if (data.length === 0 || data.length !== response.data.length) {
        setData(response.data);
      }
    })
      .catch((error) => console.log(error));
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
    axios.delete("http://localhost:9090/api/artists/" + id).then((res) => {
      axios.get("http://localhost:9090/api/artists").then((response) => {
        setData(response.data);
      })
        .catch((error) => console.log(error));
    })
      .catch((error) => console.log(error))
    setOpen(false);
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 80,
    },
    {
      field: "image",
      headerName: "Hình ảnh",
      width: 100,

      renderCell: (params) => {
        return (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img
              className="artistListImg"
              src={params.row.artistImage}
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
      headerName: "Hành động",
      width: 300,
      renderCell: (params) => {
        return (
          <>
            <Link
              to={"/artists/detail/" + params.row.id}
              state={params.row}
            >
              <Button className="artistListBtn View" variant="contained">Xem</Button>
            </Link>

            <Link to={"/artists/edit/" + params.row.id} state={params.row}>
              <Button className="artistListBtn Edit" variant="contained">Sửa</Button>
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
        <Link to="/artists/create">
          <Button className="artistButton" variant="contained">
            Thêm mới
          </Button>
        </Link>
      </div>
      <div>
        <Box m="40px 0 0 0">
          <DataGrid
            rows={data}
            columns={columns}
            rowsPerPageOptions={[5]}
            initialState={{
              ...data.initialState,
              pagination: { paginationModel: { pageSize: 10 } },
            }}
            pageSize={10}
            checkboxSelection
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
