import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { format } from "date-fns";

interface CostTrendsChartProps {
  data: {
    date: string;
    totalCost: number;
  }[];
  height?: number;
}

export const CostTrendsChart = ({
  data,
  height = 301,
}: CostTrendsChartProps) => {
  // Format data for the chart
  const chartData = data.map((item) => ({
    date: format(new Date(item.date), "MMM dd"),
    cost: Math.round(item.totalCost * 100) / 100,
    fullDate: item.date,
  }));

  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart
        data={chartData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
        <XAxis
          dataKey="date"
          stroke="rgba(255,255,255,0.6)"
          tick={{ fill: "rgba(255,255,255,0.8)", fontSize: 12 }}
        />
        <YAxis
          stroke="rgba(255,255,255,0.6)"
          tick={{ fill: "rgba(255,255,255,0.8)", fontSize: 12 }}
          tickFormatter={(value) => `$${value.toLocaleString()}`}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "rgba(15, 23, 42, 0.95)",
            border: "1px solid rgba(59, 130, 246, 0.3)",
            borderRadius: "8px",
            color: "#fff",
          }}
          formatter={(value: number) => [`$${value.toLocaleString()}`, "Cost"]}
          labelFormatter={(label) => `Date: ${label}`}
        />
        <Legend wrapperStyle={{ color: "rgba(255,255,255,0.8)" }} />
        <Line
          type="monotone"
          dataKey="cost"
          stroke="#3b82f6"
          strokeWidth={3}
          dot={{ fill: "#3b82f6", r: 4 }}
          activeDot={{ r: 6, fill: "#60a5fa" }}
          name="Daily Cost"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default CostTrendsChart;
