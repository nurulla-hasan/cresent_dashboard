import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { BsArrowUpRight } from "react-icons/bs";
import PropTypes from "prop-types";

const BarChartComponents = ({ data = [] }) => {
  return (
    <div
      style={{ width: "100%", height: 400 }}
      className="p-6"
    >
      <div className="flex justify-between items-center mb-4">
      <div className="mb-6">
          <h3 className=" font-bold text-xl">Rewards Claimed</h3>
      </div>
          <BsArrowUpRight className="h-5 w-5 cursor-pointer" />
      </div>
      {Array.isArray(data) && data.length > 0 ? (
        <ResponsiveContainer>
          <BarChart data={data}>
            <XAxis dataKey="name" stroke="#000000" />
            <YAxis stroke="#000000" />
            <CartesianGrid strokeDasharray="3 3" stroke="#d3d3d3" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#ebe9ec",
                border: "1px  gray",
                borderRadius:"20px"
              }}
              itemStyle={{
                color: "#000000",
              }}
              labelStyle={{
                color: "#000000",
              }}
            />
            <Bar
              dataKey="value"
              fill="#c08fff"
              barSize={30}
              radius={[10, 10, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <div className="text-gray-400">No rewards data</div>
      )}
    </div>
  );
};

export default BarChartComponents;
BarChartComponents.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      value: PropTypes.number,
    })
  ),
};
