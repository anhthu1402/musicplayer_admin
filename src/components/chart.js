import "../styles/chart.css";
// import {
//     DollarCircleOutlined,
//     ShoppingCartOutlined,
//     ShoppingOutlined,
//     UserOutlined,
//   } from "@ant-design/icons";
import { Card, Space, Statistic, Table, Typography } from "antd";
import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { AreaChart, Area } from "recharts";

import { UsersData } from "./UserData";
import { ArtistsData } from "./ArtistsData";
import { NullableBooleanInputClasses } from "react-admin";
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
      {/* <Space direction="horizontal">
=======
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
      {/* <Space direction="horizontal">
>>>>>>> d55d7f4a39cb0e39f77c5e4a9f919ff8fb9402da
                <DashboardCard
                icon={
                    <ShoppingCartOutlined
                    style={{
                        color: "green",
                        backgroundColor: "rgba(0,255,0,0.25)",
                        borderRadius: 20,
                        fontSize: 24,
                        padding: 8,
                    }}
                    />
                }
                title={"Orders"}
                value={orders}
                />
                <DashboardCard
                icon={
                    <ShoppingOutlined
                    style={{
                        color: "blue",
                        backgroundColor: "rgba(0,0,255,0.25)",
                        borderRadius: 20,
                        fontSize: 24,
                        padding: 8,
                    }}
                    />
                }
                title={"Inventory"}
                value={inventory}
                />
                <DashboardCard
                icon={
                    <UserOutlined
                    style={{
                        color: "purple",
                        backgroundColor: "rgba(0,255,255,0.25)",
                        borderRadius: 20,
                        fontSize: 24,
                        padding: 8,
                    }}
                    />
                }
                title={"Customer"}
                value={customers}
                />
                <DashboardCard
                icon={
                    <DollarCircleOutlined
                    style={{
                        color: "red",
                        backgroundColor: "rgba(255,0,0,0.25)",
                        borderRadius: 20,
                        fontSize: 24,
                        padding: 8,
                    }}
                    />
                }
                title={"Revenue"}
                value={revenue}
                />
            </Space> */}
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
// export const ChartLineArtist= () =>{
//     const labels = [ArtistsData.artistName];
//     const data={
//         labels: labels,
//         datasets: [
//             {
//                 label: "Lượt theo dõi",
//                 backgroundcolor: "blue",
//                 borderColor: 'blue',
//                 data: [ArtistsData.numberOfFollower]
//             }
//         ]
//     }
//     const config  ={
//         type:'line',
//         data: data,
//     }
//     const canvas = document.getElementById('canvas')
//     new chart = new Chart(canvas, config)
//     return(
//         <div>
//             <div class="Title">Nghệ sĩ</div>
//             <canvas id="canvas"></canvas>
//         </div>

//     )
// }

// const Chart = ({ aspect, title, dataKey, data, name }) => {
//     return (
//       <div className="chart">
//         <div className="title">{title}</div>
//         <ResponsiveContainer width="100%" aspect={aspect}  >
//           <AreaChart
//             width<<<<<<<={730}
//             height={250}
//             data={data}
//             margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
//           >
//             <defs>
//               <linearGradient id={dataKey} x1="0" y1="0" x2="0" y2="1">
//                 <stop offset="5%" stopColor="#8884d8" stopOpacity={0.5} />
//                 <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />

//               </linearGradient>
//             </defs>
//             <XAxis dataKey={name} stroke="gray"  />
//             <CartesianGrid strokeDasharray="5 5" className="chartGrid" />
//             <Tooltip />
//             <Area
//               type="monotone"
//               dataKey={dataKey}
//               stroke="#8884d8"
//               fillOpacity={1}
//               fill="url(#datakey)"
//             //   fill={value= "200000"}
//             // values="10000000"
//             />
//           </AreaChart>
//         </ResponsiveContainer>
//       </div>
//     );
//   };

//   export default Chart;
