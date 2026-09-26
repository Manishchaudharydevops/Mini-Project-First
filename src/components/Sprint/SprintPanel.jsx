import { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { computeSprintStats, getSprintTimeline } from "../../utils/sprintStats";
import SprintFormModal from "./SprintFormModal";

export default function SprintPanel() {
  const { tasks, sprints, activeSprint, createSprint, completeSprint } = useAppContext();
  const [modalOpen, setModalOpen] = useState(false);

  const stats = computeSprintStats(tasks, activeSprint?.id);
  const timeline = getSprintTimeline(activeSprint);

  const completedSprints = sprints.filter((s) => s.status === "completed");

  function handleSave(sprintData) {
    createSprint(sprintData);
    setModalOpen(false);
  }

  return (
    <div className="sprint-page">
      <div className="board-page-header">
        <h2>Sprint Management</h2>
        <button className="btn-primary" onClick={() => setModalOpen(true)}>
          + New Sprint
        </button>
      </div>

      {activeSprint ? (
        <div className="sprint-card">
          <div className="sprint-card-header">
            <h3>{activeSprint.name}</h3>
            <button
              className="btn-secondary"
              onClick={() => completeSprint(activeSprint.id)}
            >
              Complete Sprint
            </button>
          </div>
          <p className="sprint-dates">
            {activeSprint.startDate} → {activeSprint.endDate} ({timeline.daysLeft >= 0
              ? `${timeline.daysLeft} day(s) left`
              : "Overdue"})
          </p>
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
              <span className="stat-label">Total Story Points</span>
            </div>
            <div className="stat-box">
              <span className="stat-value">{stats.completedPoints}</span>
              <span className="stat-label">Completed Points</span>
            </div>
            <div className="stat-box">
              <span className="stat-value">{stats.completionPercent}%</span>
              <span className="stat-label">Completion</span>
            </div>
          </div>
        </div>
      ) : (
        <p className="empty-column-text">
          No active sprint. Create a new sprint to start planning.
        </p>
      )}

      {completedSprints.length > 0 && (
        <div className="sprint-history">
          <h3>Completed Sprints</h3>
          <table className="sprint-history-table">
            <thead>
              <tr>
                <th>Sprint</th>
                <th>Dates</th>
                <th>Velocity (pts)</th>
              </tr>
            </thead>
            <tbody>
              {completedSprints.map((s) => (
                <tr key={s.id}>
                  <td>{s.name}</td>
                  <td>
                    {s.startDate} → {s.endDate}
                  </td>
                  <td>{s.velocity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {modalOpen && (
        <SprintFormModal onSave={handleSave} onClose={() => setModalOpen(false)} />
      )}
    </div>
  );
}
