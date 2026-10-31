import { todayString, daysBetween } from "./dateHelpers";

export function calculateRisk(tasks, sprint) {
  if (!sprint) {
    return { score: 0, level: "Low", reasons: ["No active sprint found."] };
  }

  const today = todayString();
  const sprintTasks = tasks.filter((t) => t.sprintId === sprint.id);

  let totalPoints = 0;
  let donePoints = 0;
  let overdue = 0;
  let highPending = 0;
  let inProgress = 0;

  for (const task of sprintTasks) {
    const points = Number(task.storyPoints) || 0;
    totalPoints += points;
    if (task.status === "done") {
      donePoints += points;
    } else {
      if (task.dueDate && task.dueDate < today) overdue++;
      if (task.priority === "High") highPending++;
    }
    if (task.status === "inprogress") inProgress++;
  }

  const remainingPoints = totalPoints - donePoints;
  const completion = totalPoints > 0 ? Math.round((donePoints / totalPoints) * 100) : 0;
  const totalDays = Math.max(1, daysBetween(sprint.startDate, sprint.endDate));
  let passedDays = daysBetween(sprint.startDate, today);
  if (passedDays < 0) passedDays = 0;
  if (passedDays > totalDays) passedDays = totalDays;
  const timePassed = Math.round((passedDays / totalDays) * 100);
  const daysLeft = daysBetween(today, sprint.endDate);

  let score = 0;
  const reasons = [];

  if (overdue > 0) {
    score += Math.min(30, overdue * 10);
    reasons.push(overdue + " task(s) are overdue");
  }
  if (highPending > 0) {
    score += Math.min(20, highPending * 8);
    reasons.push(highPending + " high-priority task(s) are incomplete");
  }
  if (inProgress > 3) {
    score += 10;
    reasons.push("Too many tasks in progress (" + inProgress + ")");
  }
  if (totalPoints > 0 && timePassed >= 50 && completion < 40) {
    score += 15;
    reasons.push("Only " + completion + "% completed but " + timePassed + "% of sprint time is over");
  }
  if (remainingPoints > 15) {
    score += 10;
    reasons.push(remainingPoints + " story points are still remaining");
  }
  if (remainingPoints > 0 && daysLeft >= 0 && daysLeft <= 2) {
    score += 20;
    reasons.push("Sprint deadline is approaching (" + daysLeft + " day(s) left)");
  }
  if (remainingPoints > 0 && daysLeft < 0) {
    score += 25;
    reasons.push("Sprint deadline has passed with work remaining");
  }

  if (score > 100) score = 100;

  let level = "Low";
  if (score >= 60) {
    level = "High";
  } else if (score >= 30) {
    level = "Medium";
  }

  if (reasons.length === 0) {
    reasons.push("No major risk found in this sprint");
  }

  return { score: score, level: level, reasons: reasons };
}
