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
    const handleDelete =(id) => {
        // setData(data.filter((item) => item.id !== id));
        // const newsId = item.id;
        // this.setState(data => ({
        //     news: data.news.filter(elm => elm.id !== newsId )
        // }));
    }
    const columns=[
        {
            field:"id",
            headerName: "ID",
            width: 50,
        },
        {
          field:"image",
          headerName: "Hình ảnh",
          width: 100,
          editable: true,
          renderCell: (params) => {
              return(
                  <div >
                    <img className="userListImg"
                      src={require("../assets/" + params.row.image)}
                      alt={params.row.name}
                      width={70}
                      height={70}
                    />
                  </div>
              )
          }
          
        },
        {
            field: "userName",
            headerName: "Tên người dùng",
            width: 150,
            editable: true,
            renderCell: (params) => {
                return(
                    <div className="userListUser">
                        {params.row.userName}
                    </div>
                )
            }
            
        }, 
        {
            field: "fullName",
            headerName: "Tên đầy đủ",
            width: 200,
            editable: true,
            renderCell: (params) => {
                return(
                    <div className="userListUser">
                        {params.row.fullName}
                    </div>
                )
            }
            
        }, 
        {
            field: "mail",
            headerName: "Mail",
            width: 200,
            editable: true,
            renderCell: (params) => {
                return(
                    <div>
                        {params.row.mail}
                    </div>
                )
            }
            
        },
        {
            field: "sdt",
            headerName: "Số điện thoại",
            width: 100,
            editable: true,
            renderCell: (params) => {
                return(
                    <div style={{textAlign:'center'}}>
                        {params.row.sdt}
                    </div>
                )
            }
            
        },
        
        {
            field:"action",
            headerName: "Action",
            width: 250,
            renderCell: (params) => {
                return(
                    <>
                        <Link to={"/user/" + params.row.id}>
                            <button className="userListEdit">Edit</button>
                        </Link>
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
                    rows = {rows}
                    disableSelectionOnClick
                    columns={columns}
                    pageSize={8}
                    initialState={{
                        ...data.initialState,
                        pagination: { paginationModel: { pageSize: 8 } },
                      }}
                    checkboxSelection
                    components={{ Toolbar: GridToolbar }}
                    // isCellEditable={(params)}

                />
            </Box>
            
        </div>
    )
  }
  
  
export default MUser;

