export default function TaskCard({ task, sprintName, onEdit, onDelete, onDragStart }) {
  const priorityClass = `priority-badge priority-${task.priority.toLowerCase()}`;
  const isOverdue =
    task.status !== "done" &&
    task.dueDate &&
    new Date(task.dueDate) < new Date(new Date().toDateString());

  return (
    <div
      className="task-card"
      draggable
      onDragStart={(e) => onDragStart(e, task.id)}
    >
      <div className="task-card-header">
        <span className={priorityClass}>{task.priority}</span>
        {sprintName && <span className="sprint-badge">{sprintName}</span>}
      </div>
      <h4 className="task-title">{task.title}</h4>
      {task.description && <p className="task-description">{task.description}</p>}
      <div className="task-meta">
        {task.assignee && <span>👤 {task.assignee}</span>}
        {task.storyPoints > 0 && <span>⭐ {task.storyPoints} pts</span>}
        {task.dueDate && (
          <span className={isOverdue ? "overdue-text" : ""}>
            📅 {task.dueDate}
          </span>
        )}
      </div>
      <div className="task-actions">
        <button className="btn-link" onClick={() => onEdit(task)}>
          Edit
        </button>
        <button className="btn-link danger" onClick={() => onDelete(task.id)}>
          Delete
        </button>
      </div>
    </div>
  );
}
