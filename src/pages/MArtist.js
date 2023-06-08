import React, { useEffect, useMemo, useState } from 'react';
import { Avatar, Box, Button, IconButton, Tooltip, Typography} from '@mui/material';
import { ArtistsData } from "../components/ArtistsData";
import { DataGrid, gridClasses, GridToolbar, selectedGridRowsCountSelector } from '@mui/x-data-grid';
import { Modal } from "../components/Modal";
import "../styles/martist.css";
import {
  DeleteOutline,
} from "@mui/icons-material";
import { Delete, Preview } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
import {NewArtist} from "../components/NewArtist"
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { EditButton, editFieldTypes } from 'react-admin';
import {
  List,
  Edit,
  Datagrid,
  SimpleForm,
  TextInput,
  ImageInput,
  DateInput,
  DateField,
  required,
} from 'react-admin';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Alert from '@mui/material/Alert';
//import { CreateDialog } from '@react-admin/ra-form-layout';

// const ArtistForm = (props) => (
//   <SimpleForm {...props}>
//     <TextInput source="name" validate={required()} fullWidth />
//     <ImageInput source="image" validate={required()} fullWidth />
//   </SimpleForm>
// );
// const ArtistEdit = (props) => {
//   return (
//       <Edit title='Chỉnh sửa thông tin nghệ sĩ' {...props} successMessage="messages.post_saved" {...props}>
//           <SimpleForm>
//           <TextInput disabled source="id" />
//               <TextInput source="name" />
//               <ImageInput source="image" />
//           </SimpleForm>
//       </Edit>
// )
// }
const MArtist = () => { 
  const [data, setData] = useState(ArtistsData);
  const rows = ArtistsData;
  const [updateState, setUpdateState]=useState({});
  const [showData, setShowData] = useState(ArtistsData);
  const [opens, setOpens] = React.useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [rowToEdit, setRowToEdit] = useState(null);
  const handleEditRow = (idx) => {
    setRowToEdit(idx);

    setModalOpen(true);
  };
  const handleClickOpens=()=>{
      setOpens(true);
  }
  const handleCloses=()=>{
    setOpens(false);
}
  const handleDelete = (id) => {
    alert("Bạn chắc chắn xóa");
    setData(data.filter((item) => item.id !== id));
    
  };

  const columns=[
      {
          field:"id",
          headerName: "ID",
          width: 100,
      },
      {
        field:"image",
        headerName: "Hình ảnh",
        width: 200,
        
        renderCell: (params) => {
            return(
                <div style={{alignItems:'center'}}>
                  <img className="artistListImg" 
                    src={require("../assets/" + params.row.artistImage)}
                    alt={params.row.artistName}
                    width={70}
                    height={70}
                  />
                </div>
            )
        }
        
      },
      {
          field:"name",
          headerName: "Nghệ sĩ",
          width: 250,
          editable: true,
          renderCell: (params) => {
              return(
                  <div className="artistListArtist">
                      {params.row.artistName}
                  </div>
              )
          }
          
      },
      {
        field:"follower",
        headerName: "Người theo dõi",
        width: 200,
        
        renderCell: (params) => {
            return(
                <div className="artistListFollow">
                    {params.row.numberOfFollower}
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
                      {/* <IconButton
                        onClick={() => dispatch({ type: 'UPDATE_ROOM', payload: params.row })}
                      >
                        <Preview />
                      </IconButton> */}
                      <Link to={`/artistDetail/${params.artistName}`} state={params.id}>
                         <button className="artistListView" onClick={(handleClickOpens,selectRow)=>setShowData({ fimage:selectRow.imageArtist, fname:selectRow.nameArtist,ffolow:selectRow.numberOfFollower})}>View</button>
                      </Link>
                      
                      <button className="artistListEdit" onClick={() => handleEditRow()}>Edit</button>
                      <DeleteOutline className='artistListDelete'  onClick={() => handleDelete(params.row.id)}  />
                      {/* onClick={() => handleDelete(params.row, currentUser, dispatch)} */}
                      {/* onClick={()=>  selectedGridRowsCountSelector(params)} */}
                  </>
              )
          }
      },
  ];
  return(
      <div className="artistList">
          <div className='button'>
            <h1 className='title'>Nghệ sĩ</h1>
            <Link to="/newArtist">
              <button className='artistButtton'>
                {/* <span><AddIcon style={{size:'1rem'}}></AddIcon></span> */}
                <span>Thêm mới</span>
              </button>
            </Link>
            
          </div>
          <div>
            <Box m="40px 0 0 0" height="75vh">
                <DataGrid 
                    rows = {data}
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
            {modalOpen && (
            <Modal
              closeModal={() => {
                setModalOpen(false);
                setRowToEdit(null);
              }}
              // onSubmit={handleSubmit}
              defaultValue={rowToEdit !== null && rows[rowToEdit]}
            />
          )}
          <Dialog
          open={opens}
          onClose={handleCloses}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          maxWidth={'lg'}>
            <DialogTitle id="alert-dialog-title">
              {"View Artist Data"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                <table id="viewTable" style={{border:"1px solid black", width:"800px"}}>
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
  )
}

/*
function MArtist() {
    const rows = ArtistsData;
    return (
    <div className="ArtistTable">
      <h3>Nghệ sĩ</h3>
      <TableContainer
        component={Paper}
        style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
      >
        <Table sx={{ minWidth: 650 }} aria-lable="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">ID</TableCell>
              <TableCell align="center">Tên nghệ sĩ</TableCell>
              <TableCell align="center">Ảnh</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="left">{row.name}</TableCell>
                <TableCell align="center">
                  <img
                    src={require("../assets/" + row.image)}
                    alt={row.name}
                    width={70}
                    height={70}
                  />
                </TableCell>
                <EditButton></EditButton>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );

    
}
*/
export default MArtist;

  // const handleSubmit = (newRow) => {
    // rowToEdit === null
    //   ? setRows([...rows, newRow])
    //   : setRows(
    //       rows.map((currRow, idx) => {
    //         if (idx !== rowToEdit) return currRow;

    //         return newRow;
    //       })
    //     );
  // };
  // const {
  //   dispatch,
  //   state: { currentUser },
  // } = useValue();
  // useEffect(()=>{
  //   fireDb.child("artists").on("value",(snapshot)=>{
  //     if(snapshot.val() !== null){
  //       setData({...snapshot.val()});
  //     }else{
  //       setData({});
  //     }
  //   });
  //   return()=>{
  //     setData({});
  //   }
  // })
  // const handleDelete = (params) => {
  //     selectedGridRowsCountSelector(rows.filter((_,id)=>id !== params));
  //   // if(window.confirm("Bạn chắc chắn muốn xóa?")){
  //   //   fireDb.child(`artists/${id}`).remove((err)=> {
  //   //     if(err){
  //   //       toast.error(err)
  //   //     } else{
  //   //       toast.sucess("Xóa thành công.");
  //   //     }
  //   //   })
  //   // }

  //   // alert("Bạn có muốn xóa " + params.name);
  //   // return {
  //   //   ...state,
  //   //   artirts: state.artirts.filter((artirts) => artirts._id !== action.payload),
  //   // }
  // }
  // function handleEdit(params){
  //   setUpdateState(params.id)
  // }
  // function Edit(){
  // }
