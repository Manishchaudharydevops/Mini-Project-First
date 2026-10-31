import { useState } from "react";
import Column from "./Column";
import TaskForm from "./TaskForm";
import { getDroppedTaskId, moveTask } from "../utils/dragDrop";
import { todayString } from "../utils/dateHelpers";
import "./board.css";

const columns = [
  { key: "backlog", label: "Backlog" },
  { key: "todo", label: "To Do" },
  { key: "inprogress", label: "In Progress" },
  { key: "review", label: "Review" },
  { key: "done", label: "Done" },
];

function Board({ tasks, setTasks }) {
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  function openAddForm() {
    setEditingTask(null);
    setShowForm(true);
  }

  function openEditForm(task) {
    setEditingTask(task);
    setShowForm(true);
  }

  function closeForm() {
    setShowForm(false);
    setEditingTask(null);
  }

  function saveTask(formData) {
    let completedDate = "";
    if (formData.status === "done") {
      completedDate = todayString();
      if (editingTask && editingTask.completedDate) {
        completedDate = editingTask.completedDate;
      }
    }

    if (editingTask) {
      const updatedTasks = tasks.map((t) => {
        if (t.id === editingTask.id) {
          return { ...t, ...formData, completedDate: completedDate };
        }
        return t;
      });
      setTasks(updatedTasks);
    } else {
      const newTask = {
        ...formData,
        id: "task" + Date.now() + Math.floor(Math.random() * 1000),
        sprintId: null,
        completedDate: completedDate,
      };
      setTasks([...tasks, newTask]);
    }
    closeForm();
  }

  function deleteTask(taskId) {
    if (window.confirm("Delete this task?")) {
      setTasks(tasks.filter((t) => t.id !== taskId));
    }
  }

  function handleDrop(e, newStatus) {
    const taskId = getDroppedTaskId(e);
    if (!taskId) return;
    setTasks(moveTask(tasks, taskId, newStatus));
  }

  return (
    <div>
      <div className="page-top">
        <h2>Agile Board</h2>
        <button className="btn btn-primary" onClick={openAddForm}>+ Add Task</button>
      </div>
      <div className="board">
        {columns.map((col) => (
          <Column
            key={col.key}
            column={col}
            tasks={tasks.filter((t) => t.status === col.key)}
            onEdit={openEditForm}
            onDelete={deleteTask}
            onDrop={handleDrop}
          />
        ))}
      </div>
      {showForm && <TaskForm task={editingTask} onSave={saveTask} onClose={closeForm} />}
    </div>
  );
}

export default Board;
