import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { computeSprintStats, daysBetween } from "../../utils/sprintStats";

export default function BurndownChart({ sprint, tasks, burndownLog }) {
  if (!sprint) {
    return <p className="empty-column-text">No active sprint to chart.</p>;
  }

  const stats = computeSprintStats(tasks, sprint.id);
  const totalDays = Math.max(1, daysBetween(sprint.startDate, sprint.endDate));
  const sprintLog = burndownLog[sprint.id] || {};
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const data = [];
  let lastKnownRemaining = stats.totalPoints;

  for (let i = 0; i <= totalDays; i++) {
    const date = new Date(sprint.startDate);
    date.setDate(date.getDate() + i);
    const dateKey = date.toISOString().slice(0, 10);
    const idealRemaining = Math.max(
      0,
      Math.round(stats.totalPoints - (stats.totalPoints / totalDays) * i)
    );

    let actualRemaining = null;
    if (sprintLog[dateKey] !== undefined) {
      lastKnownRemaining = sprintLog[dateKey];
      actualRemaining = lastKnownRemaining;
    } else if (date <= today) {
      actualRemaining = lastKnownRemaining;
    }

    data.push({
      day: `Day ${i}`,
      ideal: idealRemaining,
      actual: actualRemaining,
    });
  }

  return (
    <div className="chart-box">
      <h3>Burndown Chart</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis label={{ value: "Story Points", angle: -90, position: "insideLeft" }} />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="ideal"
            name="Ideal Burndown"
            stroke="#94a3b8"
            strokeDasharray="5 5"
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="actual"
            name="Actual Remaining"
            stroke="#2563eb"
            connectNulls
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
