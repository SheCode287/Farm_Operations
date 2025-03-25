import { FaLeaf, FaTasks, FaBox } from "react-icons/fa";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import useResourcesHook from "../hooks/useResources";
import useCropsHook from "../hooks/useCrops";
import useActivitiesHook from "../hooks/useActivities";

const Dashboard = () => {
  const {data: totalResources} = useResourcesHook()
  const {data: totalCrops} = useCropsHook()
  const {data: totalActivities} = useActivitiesHook()
  console.log(totalCrops)
  const stats = [
    { title: "Total Crops", value: totalCrops?.data?.length, icon: <FaLeaf />, color: "#2e7d32" },
    { title: "Total Activities", value: totalActivities?.data?.length, icon: <FaTasks />, color: "#1b5e20" },
    { title: "Total Resources", value: totalResources?.data?.length, icon: <FaBox />, color: "#4caf50" },
  ];
  const chartData = [
    { name: "Crops", value: totalCrops?.data?.length, color: "#2e7d32" },
    { name: "Activities", value: totalActivities?.data?.length, color: "#1b5e20" },
    { name: "Resources", value: totalResources?.data?.length, color: "#4caf50" },
  ];

  const brightColors = ["#ff5733", "#33b5e5", "#ffcc00"];
  return ( 
    <div>
          <div className="dashboard">
      {stats.map((stat, index) => (
        <div key={index} className="dashboard-card" style={{ borderLeftColor: stat.color }}>
          <div className="card-icon" style={{ color: stat.color }}>
            {stat.icon}
          </div>
          <div className="card-info">
            <h3>{stat.title}</h3>
            <p>{stat.value}</p>
          </div>
        </div>
      ))}
    </div>
    <div className="charts-container">
      
        <div className="chart">
          <h3>Overview - Bar Chart</h3>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={chartData} barSize={50}>
              <XAxis dataKey="name" tick={{ fill: "#333" }} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

       
        <div className="chart">
          <h3>Distribution - Pie Chart</h3>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie data={chartData} dataKey="value" nameKey="name" outerRadius={80} label>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={brightColors[index]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>

  );
};

export default Dashboard;
