import { computeSprintStats, getSprintTasks, getSprintTimeline } from "./sprintStats";

export function computeRisk(tasks, sprint) {
  if (!sprint) {
    return { score: 0, level: "Low", reasons: ["No active sprint has been created yet."] };
  }

  const sprintTasks = getSprintTasks(tasks, sprint.id);
  const stats = computeSprintStats(tasks, sprint.id);
  const { daysLeft, elapsedPercent } = getSprintTimeline(sprint);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const overdueTasks = sprintTasks.filter(
    (t) => t.status !== "done" && t.dueDate && new Date(t.dueDate) < today
  );
  const highPriorityIncomplete = sprintTasks.filter(
    (t) => t.priority === "High" && t.status !== "done"
  );
  const inProgressTasks = sprintTasks.filter((t) => t.status === "inprogress");

  let score = 0;
  const reasons = [];

  if (overdueTasks.length > 0) {
    score += Math.min(25, overdueTasks.length * 8);
    reasons.push(`${overdueTasks.length} task(s) are overdue.`);
  }

  if (highPriorityIncomplete.length > 0) {
    score += Math.min(20, highPriorityIncomplete.length * 6);
    reasons.push(`${highPriorityIncomplete.length} high-priority task(s) are still incomplete.`);
  }

  if (inProgressTasks.length > 4) {
    score += 15;
    reasons.push(`Too many tasks (${inProgressTasks.length}) are in progress at the same time.`);
  }

  if (stats.totalTasks > 0 && stats.completionPercent < 40 && elapsedPercent > 50) {
    score += 20;
    reasons.push(
      `Only ${stats.completionPercent}% of story points are complete, but ${elapsedPercent}% of the sprint time has passed.`
    );
  }

  if (stats.remainingPoints > 15) {
    score += 10;
    reasons.push(`${stats.remainingPoints} story points still remain in this sprint.`);
  }

  if (daysLeft >= 0 && daysLeft <= 2 && stats.remainingPoints > 0) {
    score += 20;
    reasons.push(`Sprint deadline is approaching (${daysLeft} day(s) left) with work still remaining.`);
  }

  if (daysLeft < 0 && stats.remainingPoints > 0) {
    score += 25;
    reasons.push("Sprint end date has passed and work is still remaining.");
  }

  score = Math.min(100, score);

  let level = "Low";
  if (score >= 60) level = "High";
  else if (score >= 30) level = "Medium";

  if (reasons.length === 0) {
    reasons.push("No major risk factors detected in the current sprint.");
  }

  return { score, level, reasons };
}
