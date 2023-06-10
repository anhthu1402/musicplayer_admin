import React, { useState } from "react";
import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { AlbumData } from "../components/AlbumData";
import "../styles/malbum.css";
import { Link } from "react-router-dom";
import { DeleteOutline } from "@mui/icons-material";
import { PlaylistData } from "../components/PlaylistData";

function MPlaylist() {
  const handleDelete = (id) => {
    alert("Bạn chắc chắn muốn xóa");
    setData(data.filter((item) => item.id !== id));
  };
  const [data, setData] = useState(PlaylistData);
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
              src={params.row.playlistImg}
              alt={params.row.playlistName}
              width={70}
              height={70}
            />
          </div>
        );
      },
    },
    {
      field: "albumName",
      headerName: "Tên Playlist",
      width: 150,
      editable: true,
      renderCell: (params) => {
        return (
          <div className="albumListAlbum" style={{ verticalAlign: "center" }}>
            {params.row.playlistName}
          </div>
        );
      },
    },
    {
      field: "songs",
      headerName: "Bài hát",
      width: 200,

      renderCell: (params) => {
        return (
          <div
            className="songs"
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            {params.row.songPlaylist.map((child, index) => {
              if (index < Object.keys(child).length - 1) {
                return (
                  <div key={index} item={child} className="songs">
                    {child.songName}
                  </div>
                );
              } else {
                return (
                  <div key={index} item={child} className="songs">
                    , <span>{child.songName}</span>
                  </div>
                );
              }
            })}
          </div>
        );
      },
    },
    {
      field: "user",
      headerName: "Người tạo",
      width: 80,

      renderCell: (params) => {
        return (
          <div className="albumListCountry" style={{ verticalAlign: "center" }}>
            <div>
              <span className="country">{params.row.user}</span>
            </div>
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <>
            <button className="artistListView">View</button>
            <Link
              to={"/editPlaylist/" + params.row.playlistName}
              state={params.row}
            >
              <button className="albumListEdit">Edit</button>
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
        <h1 className="title">Playlist</h1>
        <Link to="/newPlaylist">
          <button className="albumButtton">
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
    </div>
  );
}

export default MPlaylist;
