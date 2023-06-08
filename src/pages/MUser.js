import React, { useState } from "react";
import { styled } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import "../styles/muser.css";
import { UsersData } from "../components/UserData";
import { DataGrid, gridClasses , GridToolbar} from '@mui/x-data-grid'
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
import {
    DeleteOutline,
    Edit,
    Delete,
} from "@mui/icons-material";
import { useRecordSelection } from "react-admin";

const MUser = () => {
    const [data, setData] = useState(UsersData);
    const rows = UsersData;
    // const handleDelete =(id) => {
    //     // setData(data.filter((item) => item.id !== id));
    //     // const newsId = item.id;
    //     // this.setState(data => ({
    //     //     news: data.news.filter(elm => elm.id !== newsId )
    //     // }));
    // }
    const handleDelete = (id) => {
        alert("Bạn chắc chắn xóa");
        setData(data.filter((item) => item.id !== id));  
    };
    const columns=[
        {
            field:"id",
            headerName: "ID",
            width: 150,
        },
        {
            field: "userName",
            headerName: "Tên người dùng",
            width: 300,
            // editable: true,
            renderCell: (params) => {
                return(
                    <div className="userListUser">
                        {params.row.userName}
                    </div>
                )
            }
            
        }, 
        {
            field: "password",
            headerName: "Mật khẩu",
            width: 300,
            // editable: true,
            renderCell: (params) => {
                return(
                    <div className="userListUser">
                        {params.row.password}
                    </div>
                )
            }
            
        }, 
        {
            field:"action",
            headerName: "Action",
            width: 300,
            renderCell: (params) => {
                return(
                    <>
                        <DeleteOutline
                            className="userListDelete"
                            onClick={() => handleDelete(params.row.id)} 
                        />
                    </>
                )
            }
        },
    ];
    return(
        <div className="userList">
            <div className='button'>
                <h1 className='title'>Người dùng</h1> 
                <Link to="/newUser">
                    <button className='userButtton'>
                        {/* <span><AddIcon style={{size:'1rem'}}></AddIcon></span> */}
                        <span>Thêm mới</span>
                    </button>
                </Link>
            </div>
            <Box m="40px 0 0 0" height="75vh">
                <DataGrid
                    rows = {data}
                    disableSelectionOnClick
                    // getRowId={(rowSelection) => rows.id}
                    columns={columns}
                    pageSize={8}
                    initialState={{
                        ...data.initialState,
                        pagination: { paginationModel: { pageSize: 8 } },
                      }}
                    checkboxSelection
                    components={{ Toolbar: GridToolbar }}
                    // isCellEditable={(params)}
                    // onRowSelectionModelChange={(data)=>{console.log(data);}}
                    // rowSelection={handleDelete}
                    selectedGridRowsCountSelector={handleDelete}
                />
            </Box>
            
        </div>
    )
  }
  
  
export default MUser;

