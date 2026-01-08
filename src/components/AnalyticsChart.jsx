
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function AnalyticsChart({ doctors, clinics, hospitals, diagnostics, blogs, stories }) {
  const data = [
    { name: "Doctors", count: doctors?.length || 0 },
    { name: "Clinics", count: clinics?.length || 0 },
    { name: "Hospitals", count: hospitals?.length || 0 },
    { name: "Diagnostics", count: diagnostics?.length || 0 },
    { name: "Blogs", count: blogs?.length || 0 },
    { name: "Stories", count: stories?.length || 0 },
  ];

  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          barCategoryGap="25%"      // more space between bars
          margin={{ top: 20, right: 10, left: 0, bottom: 10 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#e5e7eb"
            vertical={false}       // remove vertical grid lines
          />

          <XAxis
            dataKey="name"
            interval={0} 
            tick={{ fontSize: 10, fill: "#6b7280" }}
            axisLine={false}
            tickLine={false}
          />

          <YAxis
            allowDecimals={false}
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
            cursor={{ fill: "rgba(59, 130, 246, 0.08)" }}
          />

          <Bar
            dataKey="count"
            fill="#3b82f6"
            barSize={25}                 // 👈 thinner bars
            radius={[5, 5, 0, 0]}     // rounded top
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default AnalyticsChart;
