import { useState } from "react";

export default function SprintFormModal({ onSave, onClose }) {
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim() || !startDate || !endDate) return;
    onSave({ name, startDate, endDate });
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <h3>Create New Sprint</h3>
        <form onSubmit={handleSubmit} className="modal-form">
          <label>
            Sprint Name
            <input
              type="text"
              placeholder="Sprint 1"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <div className="modal-form-row">
            <label>
              Start Date
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </label>
            <label>
              End Date
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
              />
            </label>
          </div>
          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Start Sprint
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
