import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function RevenueChart() {
  // Dummy monthly data
  const data = [
    { month: "Jan", subscriptions: 12, revenue: 2400 },
    { month: "Feb", subscriptions: 18, revenue: 3600 },
    { month: "Mar", subscriptions: 25, revenue: 5200 },
    { month: "Apr", subscriptions: 32, revenue: 6800 },
    { month: "May", subscriptions: 45, revenue: 9400 },
    { month: "Jun", subscriptions: 60, revenue: 12800 },
  ];

  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 20, right: 20, left: 0, bottom: 10 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#e5e7eb"
            vertical={false}
          />

          <XAxis
            dataKey="month"
            tick={{ fontSize: 12, fill: "#6b7280" }}
            axisLine={false}
            tickLine={false}
          />

          <YAxis
            tick={{ fontSize: 12, fill: "#6b7280" }}
            axisLine={false}
            tickLine={false}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: "#ffffff",
              borderRadius: "8px",
              border: "1px solid #e5e7eb",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              fontSize: "12px",
            }}
            cursor={{ stroke: "#3b82f6", strokeWidth: 1 }}
          />

          {/* Subscriptions Line */}
          <Line
            type="monotone"
            dataKey="subscriptions"
            stroke="#3b82f6"
            strokeWidth={3}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />

          {/* Revenue Line */}
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#22c55e"
            strokeWidth={3}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default RevenueChart;
