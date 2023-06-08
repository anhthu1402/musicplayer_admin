import React, { useEffect, useMemo, useState } from 'react';
import { Avatar, Box, Button, IconButton, Tooltip, Typography} from '@mui/material';
import { DataGrid, gridClasses, GridToolbar, selectedGridRowsCountSelector } from '@mui/x-data-grid';
import { SongData } from "../components/SongData";
import SongItem from "../components/SongItem";
import "../styles/msong.css";
//import "./components/nsong.cshtml";
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import {
    DeleteOutline,
    Edit,
    Delete,
} from "@mui/icons-material";

const MSong = () => {
    const [data, setData] = useState(SongData);
    const rows = SongData
    
    // const handleDelete =(id) => {
    //     setData(data.filter((item) => item.id !== id));
    // }
    // const handleDelete = (params) => {
    //     selectedGridRowsCountSelector(rows.filter((_,id)=>id !== params));
    // }
    const handleDelete = (id) => {
        alert("Bạn chắc chắn xóa");
        setData(data.filter((item) => item.id !== id));
    };
    const columns=[
        {
            field:"id",
            headerName: "ID",
            width: 50,
        },
        {
            field:"songImage",
            headerName: "Ảnh bài hát",
            width: 100,
            
            renderCell: (params) => {
                return(
                    <div className="songListSong" style={{verticalAlign: 'center'}}>
                        <img className="songListImg" 
                        src ={require("../assets/" + params.row.songImage)} 
                        alt={params.row.songName} 
                        width={70} 
                        height={70}/>
                    </div>
                )
            }
        },
        {
            field:" songName",
            headerName: "Tên bài hát",
            width: 200,
            editable: true,
            renderCell: (params) => {
                return(
                    <div className="songListSong" style={{verticalAlign: 'center'}}>
                        {params.row. songName}
                    </div>
                )
            }   
        },
        {
            field:"releaseDate",
            headerName: "Thời gian",
            width: 150,
            
            renderCell: (params) => {
                return(
                    <div className="songListSong" style={{verticalAlign: 'center'}}>
                        {params.row.releaseDate}
                    </div>
                )
            }   
        },
        {
            field:"representation",
            headerName: "Nghệ sĩ",
            width: 200,
            
            renderCell: (params) => {
                return(
                    <div className="songListArtist" >
                        {params.row.representation.map((child,index)=>{
                            if (index < Object.keys(child).length - 1) {
                                return (
                                  <div key={index} item={child} className="artist">
                                    <Link
                                        to={`/artist/${child.artistName}`}
                                        state={child}
                                        color="grey"
                                    >
                                        {child.artistName}
                                    </Link>
                                  </div>
                                );
                              } else
                                 return (
                                  <div key={index} item={child}>
                                    , <span className="artist">
                                        <Link
                                            to={`/artist/${child.artistName}`}
                                            state={child}
                                            color="grey"
                                        >
                                            {child.artistName}
                                       </Link>
                                        </span>
                                  </div>
                                );})}
                    </div>
                )
            }
            
        },
        {
            field:"country",
            headerName: "Nước",
            width: 150,
            
            renderCell: (params) => {
                return(
                    <div className="albumListCountry" style={{verticalAlign: 'center'}}>
                                {params.row.country.map((child,index)=>{
                                return (
                                  <div key={index} item={child}>
                                    <span className="country">{child.countryName}</span>
                                  </div>
                                );})}
                    </div>
                )
            }
            
        },
        {
            field:"action",
            headerName: "Action",
            width: 200,
            renderCell: (params) => {
                return(
                    <>
                        <button className="songListView">View</button>
                        <Link to="/newSong">
                            <button className="songListEdit">Edit</button>
                        </Link>
                        <DeleteOutline className='songListDelete' onClick={() => handleDelete(params.row.id)}/>
                    </>
                )
            }
        },
    ];
    // const columnsArtist=[
    //     {
    //         field:"name",
    //         headerName: "Bài hát",
    //         width: 200,
            
    //         renderCell: (params) => {
    //             return(
    //                 <div className="songListSong">
    //                     {params.row.name}
    //                 </div>
    //             )
    //         }
            
    //     },]
    return(
        <div className="songList">
            <div className='button'>
                <h1 className=' songName'>Bài hát</h1>
                <Link to="/newSong">
                    <button className='songButtton'>
                        {/* <span><AddIcon style={{size:'1rem'}}></AddIcon></span> */}
                        <span>Thêm mới</span>
                    </button>
                </Link>
            </div>
            <Box m="40px 0 0 0" height="75vh">
                <DataGrid
                    rows = {data}
                    disableSelectionOnClick
                    columns={columns}
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
            
        </div>
    )
}

/* 
function MSong() {
    return (
        <div className="msong">
            <span className="song songName">Bài hát</span>
            <ul className="songList">
                <li className="songListItem">
                    <img>{SongData.map((item,idex)=> item.songImage)}</img>
                    <div className="song">
                        <span className="songName">{SongData.map((item,idex)=> item. songName)}</span>
                        <span className="songArtist">{SongData.item.artist.map((child, index)=> child.name)}</span>
                    </div>
                    <button className='EditSong'><Edit /></button>
                    <button className='DeleteSong'><Delete /></button>
                </li>
            </ul>

        </div>
    )
}
*/
/*
class MSong extends React.Component {
    editRow=(event,id) =>{
        console.log('editRow',event,id);
    };
    deleteRow=(event,id) =>{
        console.log('deleteRow',event,id);
    };
    constructor (props){
        super(props);
        const columns = [
            {
                field: 'id',
                headerName: 'ID',
                width: 100,
            },
            {
                field: 'songImage',
                headerName: 'Hình ảnh',
                width: 100,
            },
            {
                field: ' songName',
                headerName: 'Tên bài hát',
                width: 200,
            },
            {
                field: 'artist.name',
                headerName: 'Tên nghệ sĩ',
                width: 200,
            },
            {
            field: 'edit',
            headerName: 'Chỉnh sửa',
            width: 100,
            renderCell: (params) =>(
                <Button style={{marginTop: 10, cursor: 'hand'}}>
                    <Edit onclick={()=>this.editRow(params.value)}></Edit>
                </Button>
            )
            },
            {
                field: 'delete',
                headerName: 'Xóa',
                width: 100,
                renderCell: (params) =>(
                    <Button style={{marginTop: 10, cursor: 'hand'}}>
                        <Delete onclick={()=>this.deleteRow(params.value)}></Delete>
                    </Button>
                )
                },
        ];
        const rows = SongData;
        this.state ={
            columns: columns,
            songs: [],
            selectedSong: props.SongData,
        }
        return (
            <Box sx={{ height: 400, width: '100%' }}>
              <DataGrid
                rows={rows}
                columns={columns}
                initialState
                checkboxSelection
                disableRowSelectionOnClick
              />
            </Box>
          );
    }
}
*/

/*
function MSong(){  
const [songData, setSongData] = useState([]);
    
    const editRow=(event,id) =>{
        console.log('editRow',event, id);
    };
    const deleteRow=(event, id) =>{
        console.log('deleteRow',event, id);
    };
const columns = [
    {
        field: 'id',
        headerName: 'ID',
        width: 100,
    },
    {
        field: 'songImage',
        headerName: 'Hình ảnh',
        width: 100,
    },
    {
        field: ' songName',
        headerName: 'Tên bài hát',
        width: 200,
    },
    {
        field: 'artist.name',
        headerName: 'Tên nghệ sĩ',
        width: 200,
    },
    {
    field: 'edit',
    headerName: 'Chỉnh sửa',
    width: 100,
    renderCell: (params) =>(
        <Button style={{marginTop: 10, cursor: 'hand'}}>
            <Edit onclick={()=>this.editRow(params.value)}></Edit>
        </Button>
    )
    },
    {
        field: 'delete',
        headerName: 'Xóa',
        width: 100,
        renderCell: (params) =>(
            <Button style={{marginTop: 10, cursor: 'hand'}}>
                <Delete onclick={()=>this.deleteRow(params.value)}></Delete>
            </Button>
        )
        },
    ];
    const rows = SongData;


    return (
        <Box sx={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5]}
            checkboxSelection
            disableRowSelectionOnClick
          />
        </Box>
      );

}
*/

export default MSong;

