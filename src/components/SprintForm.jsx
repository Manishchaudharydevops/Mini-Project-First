import { useState } from "react";

function SprintForm({ onSave, onClose }) {
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (name.trim() === "" || startDate === "" || endDate === "") {
      alert("Please fill all the fields");
      return;
    }
    onSave({ name: name, startDate: startDate, endDate: endDate });
  }

  return (
    <div className="modal-bg">
      <div className="modal">
        <h3>Create Sprint</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Sprint Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Sprint 1" />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Start Date</label>
              <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            </div>
            <div className="form-group">
              <label>End Date</label>
              <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            </div>
          </div>
          <div className="form-buttons">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">Start Sprint</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SprintForm;
