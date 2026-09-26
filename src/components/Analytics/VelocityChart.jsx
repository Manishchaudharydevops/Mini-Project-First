import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { computeSprintStats } from "../../utils/sprintStats";

export default function VelocityChart({ sprints, activeSprint, tasks }) {
  const completedSprints = sprints.filter((s) => s.status === "completed");
  const data = completedSprints.map((s) => ({
    name: s.name,
    velocity: s.velocity || 0,
  }));

  if (activeSprint) {
    const stats = computeSprintStats(tasks, activeSprint.id);
    data.push({ name: `${activeSprint.name} (current)`, velocity: stats.completedPoints });
  }

  if (data.length === 0) {
    return <p className="empty-column-text">No sprint data available yet.</p>;
  }

  return (
    <div className="chart-box">
      <h3>Velocity</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis label={{ value: "Story Points", angle: -90, position: "insideLeft" }} />
          <Tooltip />
          <Bar dataKey="velocity" fill="#16a34a" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
