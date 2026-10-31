import { useState } from "react";

function TaskForm({ task, onSave, onClose }) {
  const [form, setForm] = useState({
    title: task ? task.title : "",
    description: task ? task.description : "",
    priority: task ? task.priority : "Medium",
    assignee: task ? task.assignee : "",
    storyPoints: task ? task.storyPoints : 1,
    dueDate: task ? task.dueDate : "",
    status: task ? task.status : "backlog",
  });
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (form.title.trim() === "") {
      setError("Task title is required");
      return;
    }
    onSave({ ...form, storyPoints: Number(form.storyPoints) || 0 });
  }

  return (
    <div className="modal-bg">
      <div className="modal">
        <h3>{task ? "Edit Task" : "Add Task"}</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Task Title</label>
            <input name="title" value={form.title} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea name="description" rows="3" value={form.description} onChange={handleChange} />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Priority</label>
              <select name="priority" value={form.priority} onChange={handleChange}>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>
            <div className="form-group">
              <label>Story Points</label>
              <input type="number" min="0" name="storyPoints" value={form.storyPoints} onChange={handleChange} />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Assignee</label>
              <input name="assignee" value={form.assignee} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Due Date</label>
              <input type="date" name="dueDate" value={form.dueDate} onChange={handleChange} />
            </div>
          </div>
          <div className="form-group">
            <label>Status</label>
            <select name="status" value={form.status} onChange={handleChange}>
              <option value="backlog">Backlog</option>
              <option value="todo">To Do</option>
              <option value="inprogress">In Progress</option>
              <option value="review">Review</option>
              <option value="done">Done</option>
            </select>
          </div>
          {error && <p className="error-text">{error}</p>}
          <div className="form-buttons">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskForm;
