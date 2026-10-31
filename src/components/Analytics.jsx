import SummaryCards from "./SummaryCards";
import BurndownChart from "./BurndownChart";
import VelocityChart from "./VelocityChart";
import "./analytics.css";

function getStats(sprintTasks) {
  let completedTasks = 0;
  let totalPoints = 0;
  let completedPoints = 0;

  for (const task of sprintTasks) {
    const points = Number(task.storyPoints) || 0;
    totalPoints += points;
    if (task.status === "done") {
      completedTasks++;
      completedPoints += points;
    }
  }

  let completionPercent = 0;
  if (totalPoints > 0) {
    completionPercent = Math.round((completedPoints / totalPoints) * 100);
  }

  return {
    totalTasks: sprintTasks.length,
    completedTasks: completedTasks,
    remainingTasks: sprintTasks.length - completedTasks,
    totalPoints: totalPoints,
    completedPoints: completedPoints,
    remainingPoints: totalPoints - completedPoints,
    completionPercent: completionPercent,
  };
}

function Analytics({ tasks, sprints }) {
  const activeSprint = sprints.find((s) => s.status === "active");

  if (!activeSprint) {
    return (
      <div>
        <h2>Sprint Analytics</h2>
        <p className="empty-text">No active sprint. Create a sprint to see analytics.</p>
      </div>
    );
  }

  const sprintTasks = tasks.filter((t) => t.sprintId === activeSprint.id);
  const stats = getStats(sprintTasks);

  return (
    <div>
      <h2>Sprint Analytics - {activeSprint.name}</h2>
      <SummaryCards stats={stats} />
      <div className="chart-grid">
        <BurndownChart sprint={activeSprint} sprintTasks={sprintTasks} />
        <VelocityChart sprints={sprints} currentPoints={stats.completedPoints} />
      </div>
    </div>
  );
}

export default Analytics;
