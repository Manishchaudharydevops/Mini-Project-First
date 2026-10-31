function SummaryCards({ stats }) {
  return (
    <div className="stats-row">
      <div className="stat-box"><h3>{stats.totalTasks}</h3><p>Total Tasks</p></div>
      <div className="stat-box"><h3>{stats.completedTasks}</h3><p>Completed Tasks</p></div>
      <div className="stat-box"><h3>{stats.remainingTasks}</h3><p>Remaining Tasks</p></div>
      <div className="stat-box"><h3>{stats.totalPoints}</h3><p>Total Story Points</p></div>
      <div className="stat-box"><h3>{stats.completedPoints}</h3><p>Completed Points</p></div>
      <div className="stat-box"><h3>{stats.remainingPoints}</h3><p>Remaining Points</p></div>
      <div className="stat-box"><h3>{stats.completionPercent}%</h3><p>Completion</p></div>
    </div>
  );
}

export default SummaryCards;
