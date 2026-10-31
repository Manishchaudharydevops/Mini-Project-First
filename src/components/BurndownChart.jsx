import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { todayString, daysBetween, addDays } from "../utils/dateHelpers";

function BurndownChart({ sprint, sprintTasks }) {
  const today = todayString();
  const totalDays = Math.max(1, daysBetween(sprint.startDate, sprint.endDate));

  let totalPoints = 0;
  for (const task of sprintTasks) {
    totalPoints += Number(task.storyPoints) || 0;
  }

  const data = [];
  for (let i = 0; i <= totalDays; i++) {
    const date = addDays(sprint.startDate, i);
    const ideal = Math.round((totalPoints - (totalPoints * i) / totalDays) * 10) / 10;

    let actual = null;
    if (date <= today) {
      let donePoints = 0;
      for (const task of sprintTasks) {
        if (task.status === "done") {
          const doneDate = task.completedDate || today;
          if (doneDate <= date) {
            donePoints += Number(task.storyPoints) || 0;
          }
        }
      }
      actual = totalPoints - donePoints;
    }

    data.push({ day: "Day " + i, ideal: ideal, actual: actual });
  }

  return (
    <div className="card">
      <h3>Burndown Chart</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="linear" dataKey="ideal" name="Ideal Remaining" stroke="#999999" strokeDasharray="5 5" dot={false} />
          <Line type="linear" dataKey="actual" name="Actual Remaining" stroke="#2952cc" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default BurndownChart;
