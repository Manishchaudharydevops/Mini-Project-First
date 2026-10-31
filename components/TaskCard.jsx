import { startDrag } from "../utils/dragDrop";
import { todayString } from "../utils/dateHelpers";

function TaskCard({ task, onEdit, onDelete }) {
  const isOverdue = task.status !== "done" && task.dueDate && task.dueDate < todayString();

  return (
    <div className="task-card" draggable="true" onDragStart={(e) => startDrag(e, task.id)}>
      <span className={"priority priority-" + task.priority.toLowerCase()}>{task.priority}</span>
      <h4>{task.title}</h4>
      {task.description && <p className="task-desc">{task.description}</p>}
      <div className="task-info">
        {task.assignee && <span>Assignee: {task.assignee}</span>}
        <span>Points: {task.storyPoints}</span>
        {task.dueDate && (
          <span className={isOverdue ? "overdue" : ""}>Due: {task.dueDate}</span>
        )}
      </div>
      <div className="task-buttons">
        <button className="btn-link" onClick={() => onEdit(task)}>Edit</button>
        <button className="btn-link red" onClick={() => onDelete(task.id)}>Delete</button>
      </div>
    </div>
  );
}

export default TaskCard;
