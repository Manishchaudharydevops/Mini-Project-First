import { useAppContext } from "../../context/AppContext";
import { computeSprintStats } from "../../utils/sprintStats";
import BurndownChart from "./BurndownChart";
import VelocityChart from "./VelocityChart";

export default function AnalyticsDashboard() {
  const { tasks, sprints, activeSprint, burndownLog } = useAppContext();
  const stats = computeSprintStats(tasks, activeSprint?.id);

  return (
    <div className="analytics-page">
      <h2>Sprint Analytics</h2>
      <div className="stats-grid">
        <div className="stat-box">
          <span className="stat-value">{stats.totalTasks}</span>
          <span className="stat-label">Total Tasks</span>
        </div>
        <div className="stat-box">
          <span className="stat-value">{stats.completedTasks}</span>
          <span className="stat-label">Completed Tasks</span>
        </div>
        <div className="stat-box">
          <span className="stat-value">{stats.remainingTasks}</span>
          <span className="stat-label">Remaining Tasks</span>
        </div>
        <div className="stat-box">
          <span className="stat-value">{stats.totalPoints}</span>
          <span className="stat-label">Story Points</span>
        </div>
        <div className="stat-box">
          <span className="stat-value">{stats.completionPercent}%</span>
          <span className="stat-label">Completion %</span>
        </div>
      </div>
      <div className="chart-grid">
        <BurndownChart sprint={activeSprint} tasks={tasks} burndownLog={burndownLog} />
        <VelocityChart sprints={sprints} activeSprint={activeSprint} tasks={tasks} />
      </div>
    </div>
  );
}
