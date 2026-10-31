import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

function VelocityChart({ sprints, currentPoints }) {
  const pastSprints = sprints.filter((s) => s.status === "completed");
  const activeSprint = sprints.find((s) => s.status === "active");

  const data = pastSprints.map((s) => ({ name: s.name, velocity: s.velocity }));
  if (activeSprint) {
    data.push({ name: activeSprint.name + " (current)", velocity: currentPoints });
  }

  let comparison = "No previous sprint to compare with.";
  if (pastSprints.length > 0) {
    const previous = pastSprints[pastSprints.length - 1];
    const difference = currentPoints - previous.velocity;
    comparison = "Previous sprint velocity: " + previous.velocity + " points. ";
    if (difference > 0) {
      comparison += "Current sprint is ahead by " + difference + " points.";
    } else if (difference < 0) {
      comparison += "Current sprint is behind by " + Math.abs(difference) + " points.";
    } else {
      comparison += "Current sprint is equal.";
    }
  }

  return (
    <div className="card">
      <h3>Velocity</h3>
      <p className="velocity-text">Current velocity: {currentPoints} points</p>
      <p className="velocity-text">{comparison}</p>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="velocity" name="Story Points" fill="#1f8a4c" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default VelocityChart;
