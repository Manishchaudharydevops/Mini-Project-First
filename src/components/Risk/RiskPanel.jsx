import { useAppContext } from "../../context/AppContext";
import { computeRisk } from "../../utils/riskEngine";

export default function RiskPanel() {
  const { tasks, activeSprint } = useAppContext();
  const risk = computeRisk(tasks, activeSprint);
  const levelClass = `risk-level risk-${risk.level.toLowerCase()}`;

  return (
    <div className="risk-page">
      <h2>Risk Prediction</h2>
      <div className="risk-card">
        <div className="risk-score-row">
          <div className="risk-score-circle">
            <span>{risk.score}</span>
            <small>/ 100</small>
          </div>
          <div>
            <span className={levelClass}>{risk.level} Risk</span>
            {activeSprint && <p className="sprint-dates">Sprint: {activeSprint.name}</p>}
          </div>
        </div>
        <h4>Reasons</h4>
        <ul className="risk-reasons">
          {risk.reasons.map((reason, index) => (
            <li key={index}>{reason}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
