import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const getBarColor = (index) => (index % 2 === 0 ? "#34D399" : "#cfbefb");

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white shadow-md rounded-lg p-2 border border-borders">
        <p className="text-xs font-semibold text-contrast mb-1">
          {payload[0].payload.category}
        </p>
        <p className="text-sm text-gray-600">
          Total:{" "}
          <span className="text-sm font-medium text-gray-900">
            ${payload[0].payload.amount}
          </span>
        </p>
      </div>
    );
  }
  return null;
};

const CustomBarChart = ({ data }) => {
  return (
    <div className="bg-background02 mt-6">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid stroke="none" />
          <XAxis
            dataKey="category"
            tick={{ fontSize: 12, fill: "#edededff" }}
            stroke="none"
          />
          <YAxis
            width={50}
            tick={{ fontSize: 12, fill: "#edededff" }}
            stroke="none"
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: "#161616" }}
          />

          <Bar dataKey="amount" barSize={40} radius={[10, 10, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={index} fill={getBarColor(index)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomBarChart;
