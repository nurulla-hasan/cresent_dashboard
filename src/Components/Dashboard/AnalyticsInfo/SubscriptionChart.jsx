import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { BsArrowUpRight } from "react-icons/bs";

const SubscriptionChart = () => {
  const data = [
    { name: "Jan", value: 30 },
    { name: "Feb", value: 50 },
    { name: "Mar", value: 40 },
    { name: "Apr", value: 70 },
    { name: "May", value: 90 },
    { name: "Jun", value: 60 },
    { name: "Jul", value: 80 },
    { name: "Aug", value: 100 },
    { name: "Sep", value: 75 },
    { name: "Oct", value: 85 },
    { name: "Nov", value: 95 },
    { name: "Dec", value: 100 },
  ];

  return (
    <div style={{ width: "100%", height:400}} className="p-6 my-10 bg-white border rounded-3xl">
      <div className="flex justify-between items-center mb-4">
        <div className="mb-6">
          <h3 className="font-bold text-xl">Subscriptions</h3>
          <p className="text-gray-400">+8.2% from last month</p>
        </div>
        <BsArrowUpRight className="h-5 w-5 cursor-pointer" />
      </div>
      <ResponsiveContainer width="100%" height="80%">
        <LineChart data={data}>
          <XAxis dataKey="name" stroke="#000000" />
          <YAxis stroke="#000000" />
          <CartesianGrid strokeDasharray="3 3" stroke="#d3d3d3" />
          <Tooltip
            contentStyle={{
              backgroundColor: "#ebe9ec",
              border: "1px solid gray",
              borderRadius: "20px",
            }}
            itemStyle={{
              color: "#000000",
            }}
            labelStyle={{
              color: "#000000",
            }}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#c08fff"
            strokeWidth={3}
            dot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SubscriptionChart;
