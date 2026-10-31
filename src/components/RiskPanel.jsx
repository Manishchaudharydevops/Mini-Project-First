import { calculateRisk } from "../utils/riskScore";
import "./risk.css";

function RiskPanel({ tasks, sprints }) {
  const activeSprint = sprints.find((s) => s.status === "active");
  const risk = calculateRisk(tasks, activeSprint);

  return (
    <div>
      <h2>Risk Prediction</h2>
      <div className="card">
        <div className="risk-top">
          <div className={"risk-circle risk-" + risk.level.toLowerCase()}>
            <span className="risk-number">{risk.score}</span>
            <span>/ 100</span>
          </div>
          <div>
            <h3>Risk Level: {risk.level}</h3>
            {activeSprint && <p className="sprint-dates">Sprint: {activeSprint.name}</p>}
          </div>
        </div>
        <h4>Reasons</h4>
        <ul className="reason-list">
          {risk.reasons.map((reason, index) => (
            <li key={index}>{reason}</li>
          ))}
        </ul>
      </div>

      <div className="card">
        <h3>How the score is calculated</h3>
        <table className="rule-table">
          <thead>
            <tr><th>Rule</th><th>Points</th></tr>
          </thead>
          <tbody>
            <tr><td>Each overdue task</td><td>10 (max 30)</td></tr>
            <tr><td>Each incomplete high-priority task</td><td>8 (max 20)</td></tr>
            <tr><td>More than 3 tasks in progress</td><td>10</td></tr>
            <tr><td>Half of sprint time over but completion below 40%</td><td>15</td></tr>
            <tr><td>More than 15 story points remaining</td><td>10</td></tr>
            <tr><td>Deadline within 2 days with work remaining</td><td>20</td></tr>
            <tr><td>Deadline passed with work remaining</td><td>25</td></tr>
          </tbody>
        </table>
        <p className="rule-note">Total is capped at 100. Below 30 is Low, 30 to 59 is Medium, 60 and above is High.</p>
      </div>
    </div>
  );
}

export default RiskPanel;
