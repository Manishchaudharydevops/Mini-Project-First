import { useState } from "react";
import SprintForm from "./SprintForm";
import { todayString, daysBetween } from "../utils/dateHelpers";
import "./sprint.css";

function getStats(tasks, sprintId) {
  const sprintTasks = tasks.filter((t) => t.sprintId === sprintId);
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

  return {
    totalTasks: sprintTasks.length,
    completedTasks: completedTasks,
    remainingTasks: sprintTasks.length - completedTasks,
    totalPoints: totalPoints,
    completedPoints: completedPoints,
  };
}

function getDeadlineText(sprint) {
  const daysLeft = daysBetween(todayString(), sprint.endDate);
  if (daysLeft < 0) return "Sprint deadline has passed";
  if (daysLeft === 0) return "Sprint ends today";
  return daysLeft + " day(s) left";
}

function SprintPanel({ tasks, setTasks, sprints, setSprints }) {
  const [showForm, setShowForm] = useState(false);

  const activeSprint = sprints.find((s) => s.status === "active");
  const pastSprints = sprints.filter((s) => s.status === "completed");

  function finishSprint(sprint) {
    const stats = getStats(tasks, sprint.id);
    const updatedSprints = sprints.map((s) => {
      if (s.id === sprint.id) {
        return { ...s, status: "completed", velocity: stats.completedPoints };
      }
      return s;
    });
    const updatedTasks = tasks.map((t) => {
      if (t.sprintId === sprint.id && t.status !== "done") {
        return { ...t, sprintId: null };
      }
      return t;
    });
    return { updatedSprints: updatedSprints, updatedTasks: updatedTasks };
  }

  function handleCompleteSprint() {
    if (!window.confirm("Complete this sprint? Unfinished tasks go back to the available list.")) {
      return;
    }
    const result = finishSprint(activeSprint);
    setSprints(result.updatedSprints);
    setTasks(result.updatedTasks);
  }

  function handleCreateSprint(data) {
    if (data.endDate < data.startDate) {
      alert("End date cannot be before start date");
      return;
    }
    let currentSprints = sprints;
    if (activeSprint) {
      const result = finishSprint(activeSprint);
      currentSprints = result.updatedSprints;
      setTasks(result.updatedTasks);
    }
    const newSprint = {
      id: "sprint" + Date.now(),
      name: data.name,
      startDate: data.startDate,
      endDate: data.endDate,
      status: "active",
      velocity: null,
    };
    setSprints([...currentSprints, newSprint]);
    setShowForm(false);
  }

  function addToSprint(taskId) {
    setTasks(tasks.map((t) => (t.id === taskId ? { ...t, sprintId: activeSprint.id } : t)));
  }

  function removeFromSprint(taskId) {
    setTasks(tasks.map((t) => (t.id === taskId ? { ...t, sprintId: null } : t)));
  }

  const stats = activeSprint ? getStats(tasks, activeSprint.id) : null;
  const sprintTasks = activeSprint ? tasks.filter((t) => t.sprintId === activeSprint.id) : [];
  const availableTasks = tasks.filter((t) => !t.sprintId && t.status !== "done");

  return (
    <div>
      <div className="page-top">
        <h2>Sprint Management</h2>
        <button className="btn btn-primary" onClick={() => setShowForm(true)}>+ New Sprint</button>
      </div>

      {!activeSprint && (
        <p className="empty-text">No active sprint. Click "New Sprint" to start one.</p>
      )}

      {activeSprint && (
        <div className="card">
          <div className="sprint-head">
            <div>
              <h3>{activeSprint.name}</h3>
              <p className="sprint-dates">
                {activeSprint.startDate} to {activeSprint.endDate} - {getDeadlineText(activeSprint)}
              </p>
            </div>
            <button className="btn btn-secondary" onClick={handleCompleteSprint}>Complete Sprint</button>
          </div>
          <div className="stats-row">
            <div className="stat-box"><h3>{stats.totalTasks}</h3><p>Total Tasks</p></div>
            <div className="stat-box"><h3>{stats.completedTasks}</h3><p>Completed Tasks</p></div>
            <div className="stat-box"><h3>{stats.remainingTasks}</h3><p>Remaining Tasks</p></div>
            <div className="stat-box"><h3>{stats.totalPoints}</h3><p>Total Story Points</p></div>
            <div className="stat-box"><h3>{stats.completedPoints}</h3><p>Completed Story Points</p></div>
          </div>
        </div>
      )}

      {activeSprint && (
        <div className="sprint-lists">
          <div className="card">
            <h3>Tasks in this sprint</h3>
            {sprintTasks.length === 0 && <p className="empty-text">No tasks added yet</p>}
            {sprintTasks.map((t) => (
              <div className="task-row" key={t.id}>
                <span>{t.title} ({t.storyPoints} pts) - {t.status}</span>
                <button className="btn-link red" onClick={() => removeFromSprint(t.id)}>Remove</button>
              </div>
            ))}
          </div>
          <div className="card">
            <h3>Available tasks</h3>
            {availableTasks.length === 0 && <p className="empty-text">No tasks available</p>}
            {availableTasks.map((t) => (
              <div className="task-row" key={t.id}>
                <span>{t.title} ({t.storyPoints} pts)</span>
                <button className="btn-link" onClick={() => addToSprint(t.id)}>Add</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {pastSprints.length > 0 && (
        <div className="card">
          <h3>Completed Sprints</h3>
          <table className="sprint-table">
            <thead>
              <tr><th>Sprint</th><th>Dates</th><th>Velocity</th></tr>
            </thead>
            <tbody>
              {pastSprints.map((s) => (
                <tr key={s.id}>
                  <td>{s.name}</td>
                  <td>{s.startDate} to {s.endDate}</td>
                  <td>{s.velocity} pts</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showForm && <SprintForm onSave={handleCreateSprint} onClose={() => setShowForm(false)} />}
    </div>
  );
}

export default SprintPanel;
