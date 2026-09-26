import TaskCard from "./TaskCard";

export default function Column({
  column,
  tasks,
  sprintNameForTask,
  onEditTask,
  onDeleteTask,
  onDropTask,
}) {
  function handleDragOver(e) {
    e.preventDefault();
  }

  function handleDrop(e) {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("text/plain");
    if (taskId) onDropTask(taskId, column.key);
  }

  function handleDragStart(e, taskId) {
    e.dataTransfer.setData("text/plain", taskId);
  }

  return (
    <div className="board-column" onDragOver={handleDragOver} onDrop={handleDrop}>
      <div className="board-column-header">
        <span>{column.label}</span>
        <span className="column-count">{tasks.length}</span>
      </div>
      <div className="board-column-body">
        {tasks.length === 0 && <p className="empty-column-text">No tasks</p>}
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            sprintName={sprintNameForTask(task)}
            onEdit={onEditTask}
            onDelete={onDeleteTask}
            onDragStart={handleDragStart}
          />
        ))}
      </div>
    </div>
  );
}
