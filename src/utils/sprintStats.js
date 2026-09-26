export function getSprintTasks(tasks, sprintId) {
  if (!sprintId) return [];
  return tasks.filter((task) => task.sprintId === sprintId);
}

export function computeSprintStats(tasks, sprintId) {
  const sprintTasks = getSprintTasks(tasks, sprintId);
  const totalTasks = sprintTasks.length;
  const completedTasks = sprintTasks.filter((t) => t.status === "done").length;
  const remainingTasks = totalTasks - completedTasks;

  const totalPoints = sprintTasks.reduce(
    (sum, t) => sum + (Number(t.storyPoints) || 0),
    0
  );
  const completedPoints = sprintTasks
    .filter((t) => t.status === "done")
    .reduce((sum, t) => sum + (Number(t.storyPoints) || 0), 0);
  const remainingPoints = totalPoints - completedPoints;

  const completionPercent =
    totalPoints > 0 ? Math.round((completedPoints / totalPoints) * 100) : 0;

  return {
    totalTasks,
    completedTasks,
    remainingTasks,
    totalPoints,
    completedPoints,
    remainingPoints,
    completionPercent,
  };
}

export function daysBetween(dateA, dateB) {
  const msPerDay = 1000 * 60 * 60 * 24;
  const a = new Date(dateA);
  const b = new Date(dateB);
  a.setHours(0, 0, 0, 0);
  b.setHours(0, 0, 0, 0);
  return Math.round((b - a) / msPerDay);
}

export function getSprintTimeline(sprint) {
  if (!sprint) return { totalDays: 0, elapsedDays: 0, daysLeft: 0, elapsedPercent: 0 };
  const today = new Date();
  const totalDays = Math.max(1, daysBetween(sprint.startDate, sprint.endDate));
  const elapsedDaysRaw = daysBetween(sprint.startDate, today);
  const elapsedDays = Math.min(totalDays, Math.max(0, elapsedDaysRaw));
  const daysLeft = daysBetween(today, sprint.endDate);
  const elapsedPercent = Math.round((elapsedDays / totalDays) * 100);
  return { totalDays, elapsedDays, daysLeft, elapsedPercent };
}
