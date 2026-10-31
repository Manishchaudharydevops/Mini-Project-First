import TaskCard from "./TaskCard";
import { allowDrop } from "../utils/dragDrop";

function Column({ column, tasks, onEdit, onDelete, onDrop }) {
  return (
    <div className="column" onDragOver={allowDrop} onDrop={(e) => onDrop(e, column.key)}>
      <div className="column-header">
        <span>{column.label}</span>
        <span className="count">{tasks.length}</span>
      </div>
      {tasks.length === 0 && <p className="empty-text">No tasks here</p>}
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
}

export default Column;
