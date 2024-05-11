import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import "../styles/muser.css"
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import axios from "axios";

const MUser = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:9090/api/users").then((response) => {
      if (data.length === 0 || data.length !== response.data.length) {
        setData(response.data);
      }
    }).catch((error) => console.log(error))
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
    //hàm xóa ở đây
    console.log(id);
    setData(data.filter((item) => item.id !== id));
    setOpen(false);
  };
  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 200,
    },
    {
      field: "userName",
      headerName: "Tên người dùng",
      width: 400,
      renderCell: (params) => {
        return <div className="userListUser">{params.row.userName}</div>;
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 450,
      renderCell: (params) => {
        return (
          <>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];
  return (
    <div className="userList">
      <div className="button">
        <h1 className="title">Người dùng</h1>
        {/* <Link to="/users/create">
          <Button className="artistButton" variant="contained">
            Thêm mới
          </Button>
        </Link> */}
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
        <DialogTitle id="alert-dialog-title">{"Xóa người dùng"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn có chắc muốn xóa người dùng này?
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

export default MUser;
