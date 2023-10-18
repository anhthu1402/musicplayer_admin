import "../styles/chart.css";
import { Card, Space, Statistic, Table, Typography } from "antd";
import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
function DashboardCard({ title, value, icon }) {
  return (
    <Card>
      <Space direction="horizontal">
        {icon}
        <Statistic title={title} value={value} />
      </Space>
    </Card>
  );
}
function Chart({ title, data, name, dataKey, grid }) {
  return (
    <div>
      <div className="chart">
        <h3 className="chartTitle">{title}</h3>
        <ResponsiveContainer width="100%" aspect={2 / 1}>
          <LineChart data={data}>
            <XAxis dataKey={name} stroke="#5550bd" />
            <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey={dataKey}
              stroke="#483D88"
              strokeDasharray="3 4 5 2"
            />
            {/* <Line type="monotone" dataKey={dataKey} stroke="#483D88" /> */}
            {/* {grid && <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 100000" />} */}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
export default Chart;