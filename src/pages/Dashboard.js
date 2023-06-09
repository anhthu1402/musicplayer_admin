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
import { BarChart, Label, ResponsiveContainer, XAxis, YAxis, Bar, Tooltip } from "recharts";
import {CanvasJSChart} from 'canvasjs-react-charts'
import { DataArray, Dataset } from "@mui/icons-material";
import { render } from "@testing-library/react";

function Dashboard() {
    
    // var CanvasJS = CanvasJSReact.CanvasJS;
    // var CanvasJSChart = CanvasJSReact.CanvasJSChart;
    const [data, setData] = useState(ArtistsData);
    // const rows= ArtistsData
	// const options = {
	// 		title: {
	// 			text: "Basic Column Chart"
	// 		},
	// 		data: [
	// 		{
	// 			// Change type to "doughnut", "line", "splineArea", etc.
	// 			type: "column",
	// 			dataPoints: [
    //                 {data}
    //             ]
    //         }
	// 		]
	// }
    return (
        <div className="dashboard">
            <div className="widgets">
                <Widget type="user" />
                <Widget type="song" />
                <Widget type="artist" />
                <Widget type="album" />
            </div>
            <div className="charts">
                <div>
                <h3 className="chartTitle" >Artist Analytics</h3>
                <ResponsiveContainer width="100%" aspect={1.5} >
                    <BarChart data={data} >
                        <XAxis dataKey="artistName" />
                        <YAxis/>
                        <Tooltip/>
                        <Bar dataKey="numberOfFollower" fill="#ffbccc"></Bar>
                    </BarChart>
                </ResponsiveContainer>
                </div>
                {/* <div className="k-card">
                    <Chart
                        style={{
                        height: 350,
                        }}
                    >
                        <ChartTitle text="Line Chart" />
                        <ChartLegend position="top" orientation="horizontal" />
                        <ChartCategoryAxis>
                        <ChartCategoryAxisItem  startAngle={45} >
                            {ArtistsData.map((index,child) => (
                                <ChartSeriesItem
                                key={index}
                                type="line"
                                tooltip={{
                                    visible: true,
                                }}
                                data={child.artistName}
                                // name={item.name}
                                />
                            ))}
                        </ChartCategoryAxisItem>
                        </ChartCategoryAxis>
                        <ChartSeries>
                        {ArtistsData.map((index,child) => (
                            <ChartSeriesItem
                            key={index}
                            type="line"
                            tooltip={{
                                visible: true,
                            }}
                            data={child.numberOfFollower}
                            // name={item.name}
                            />
                        ))}
                        </ChartSeries>
                    </Chart>
                </div> */}
                {/* <CanvasJSChart options = {options}/> */}
                {/* <Chart data={UsersData} title="User Analytics" name="" grid dataKey="Active User"/> */}
                {/* <Chart data={SongData} name="songName" grid dataKey="" title="Song Analytics"/> */}
                {/* <Chart data={ArtistsData} name="artistName" grid dataKey="numberOfFollower" title="Artist Analytics"  aspect={3 / 1} /> */}
                {/* <Chart data={AlbumData} grid dataKey="" title="Album Analytics"/> */}
            </div>
        </div>
        
    )
}
  
  
export default Dashboard;

