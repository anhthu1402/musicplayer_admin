import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import "../styles/muser.css";
import { UsersData } from "../components/UserData";
import { DataGrid, gridClasses, GridToolbar } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import { DeleteOutline, Edit, Delete } from "@mui/icons-material";
import { useRecordSelection } from "react-admin";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Button } from "antd";

const MUser = () => {
  const [data, setData] = useState(UsersData);
  const rows = UsersData;
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
      // editable: true,
      renderCell: (params) => {
        return <div className="userListUser">{params.row.userName}</div>;
      },
    },
    // {
    //   field: "password",
    //   headerName: "Mật khẩu",
    //   width: 300,
    //   // editable: true,
    //   renderCell: (params) => {
    //     return <div className="userListUser">{params.row.password}</div>;
    //   },
    // },
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
        <Link to="/newUser">
          <button className="userButtton">
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
