import { useState } from "react";
import { BOARD_COLUMNS, useAppContext } from "../../context/AppContext";
import Column from "./Column";
import TaskFormModal from "./TaskFormModal";

export default function Board() {
  const { tasks, sprints, activeSprint, addTask, updateTask, deleteTask, moveTaskStatus } =
    useAppContext();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  function openCreateModal() {
    setEditingTask(null);
    setModalOpen(true);
  }

  function openEditModal(task) {
    setEditingTask(task);
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setEditingTask(null);
  }

  function handleSave(formData) {
    if (editingTask) {
      updateTask(editingTask.id, formData);
    } else {
      addTask(formData);
    }
    closeModal();
  }

  function sprintNameForTask(task) {
    if (!task.sprintId) return null;
    const sprint = sprints.find((s) => s.id === task.sprintId);
    return sprint ? sprint.name : null;
  }

  return (
    <div className="board-page">
      <div className="board-page-header">
        <h2>Agile Board</h2>
        <button className="btn-primary" onClick={openCreateModal}>
          + New Task
        </button>
      </div>
      <div className="board-columns">
        {BOARD_COLUMNS.map((column) => (
          <Column
            key={column.key}
            column={column}
            tasks={tasks.filter((t) => t.status === column.key)}
            sprintNameForTask={sprintNameForTask}
            onEditTask={openEditModal}
            onDeleteTask={deleteTask}
            onDropTask={moveTaskStatus}
          />
        ))}
      </div>
      {modalOpen && (
        <TaskFormModal
          initialTask={editingTask}
          activeSprint={activeSprint}
          onSave={handleSave}
          onClose={closeModal}
        />
      )}
    </div>
  );
}
