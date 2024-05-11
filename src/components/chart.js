import "../styles/chart.css";
import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
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
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
export default Chart;