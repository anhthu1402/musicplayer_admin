import React, { useState } from "react";
import Widget from "../components/widget";
import "../styles/dashboard.scss";
import { ArtistsData } from "../components/ArtistsData";
import {
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Bar,
  Tooltip,
} from "recharts";

function Dashboard() {
  const artistData = [];
  ArtistsData.map((item, index) => {
    if (index < 10) {
      artistData.push(item);
    }
  });
  const [data, setData] = useState(artistData);
  return (
    <div className="dashboard">
      <div className="widgets">
        <Widget type="user" />
        <Widget type="song" />
        <Widget type="artist" />
        <Widget type="album" />
        <Widget type="playlist" />
      </div>
      <div className="charts" style={{ width: "90%" }}>
        <div>
          <h3 className="chartTitle">Thống kê top 10 nghệ sĩ</h3>
          <ResponsiveContainer width="100%" aspect={1.75}>
            <BarChart data={data}>
              <XAxis dataKey="artistName" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="numberOfFollower" fill="#ffbccc"></Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
