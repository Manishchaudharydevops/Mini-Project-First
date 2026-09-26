import { useState } from "react";
import { BOARD_COLUMNS } from "../../context/AppContext";

const emptyForm = {
  title: "",
  description: "",
  priority: "Medium",
  assignee: "",
  storyPoints: 1,
  dueDate: "",
  status: "backlog",
  sprintId: "",
};

export default function TaskFormModal({ initialTask, activeSprint, onSave, onClose }) {
  const [form, setForm] = useState(() =>
    initialTask
      ? { ...emptyForm, ...initialTask, sprintId: initialTask.sprintId || "" }
      : { ...emptyForm, sprintId: activeSprint ? activeSprint.id : "" }
  );

  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.title.trim()) return;
    onSave({
      ...form,
      sprintId: form.sprintId || null,
      storyPoints: Number(form.storyPoints) || 0,
    });
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <h3>{initialTask ? "Edit Task" : "Create Task"}</h3>
        <form onSubmit={handleSubmit} className="modal-form">
          <label>
            Title
            <input
              type="text"
              value={form.title}
              onChange={(e) => handleChange("title", e.target.value)}
              required
            />
          </label>
          <label>
            Description
            <textarea
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
              rows={3}
            />
          </label>
          <div className="modal-form-row">
            <label>
              Priority
              <select
                value={form.priority}
                onChange={(e) => handleChange("priority", e.target.value)}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </label>
            <label>
              Story Points
              <input
                type="number"
                min="0"
                value={form.storyPoints}
                onChange={(e) => handleChange("storyPoints", e.target.value)}
              />
            </label>
          </div>
          <div className="modal-form-row">
            <label>
              Assignee
              <input
                type="text"
                value={form.assignee}
                onChange={(e) => handleChange("assignee", e.target.value)}
              />
            </label>
            <label>
              Due Date
              <input
                type="date"
                value={form.dueDate}
                onChange={(e) => handleChange("dueDate", e.target.value)}
              />
            </label>
          </div>
          <div className="modal-form-row">
            <label>
              Status
              <select
                value={form.status}
                onChange={(e) => handleChange("status", e.target.value)}
              >
                {BOARD_COLUMNS.map((c) => (
                  <option key={c.key} value={c.key}>
                    {c.label}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Sprint
              <select
                value={form.sprintId}
                onChange={(e) => handleChange("sprintId", e.target.value)}
              >
                <option value="">None (Backlog)</option>
                {activeSprint && (
                  <option value={activeSprint.id}>{activeSprint.name}</option>
                )}
              </select>
            </label>
          </div>
          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Save Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
