import React, { useState } from "react";
import { styled } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Chart from "../components/chart"
import Widget from "../components/widget"
import "../styles/dashboard.scss"
import {UsersData} from "../components/UserData"
import {ArtistsData} from "../components/ArtistsData"
import {SongData} from "../components/SongData"
import {AlbumData} from "../components/AlbumData"

function Dashboard() {
    return (
        <div className="dashboard">
            <div className="widgets">
                <Widget type="user" />
                <Widget type="song" />
                <Widget type="artist" />
                <Widget type="album" />
            </div>
            <div className="charts">
                {/* <Chart data={UsersData} title="User Analytics" name="" grid dataKey="Active User"/> */}
                {/* <Chart data={SongData} name="songName" grid dataKey="" title="Song Analytics"/> */}
                <Chart data={ArtistsData} name="artistName" grid dataKey="numberOfFollower" title="Artist Analytics"  aspect={2 / 1} />
                {/* <Chart data={AlbumData} grid dataKey="" title="Album Analytics"/> */}
            </div>
        </div>
        
    )
}
  
  
export default Dashboard;

