import { todayString, addDays } from "./dateHelpers";

export function sampleSprints() {
  const today = todayString();
  return [
    {
      id: "sprint1",
      name: "Sprint 1",
      startDate: addDays(today, -21),
      endDate: addDays(today, -8),
      status: "completed",
      velocity: 12,
    },
    {
      id: "sprint2",
      name: "Sprint 2",
      startDate: addDays(today, -7),
      endDate: addDays(today, 3),
      status: "active",
      velocity: null,
    },
  ];
}

export function sampleTasks() {
  const today = todayString();
  return [
    { id: "t1", title: "Design login page", description: "Simple form with validation", priority: "High", assignee: "Manish", storyPoints: 5, dueDate: addDays(today, -2), status: "inprogress", sprintId: "sprint2", completedDate: "" },
    { id: "t2", title: "Create task form", description: "Title, priority, points and due date", priority: "Medium", assignee: "Mayank", storyPoints: 3, dueDate: addDays(today, -4), status: "done", sprintId: "sprint2", completedDate: addDays(today, -4) },
    { id: "t3", title: "Build board columns", description: "Five columns for the board", priority: "Medium", assignee: "Manish", storyPoints: 5, dueDate: addDays(today, -2), status: "done", sprintId: "sprint2", completedDate: addDays(today, -2) },
    { id: "t4", title: "Drag and drop cards", description: "Move cards between columns", priority: "High", assignee: "Mayank", storyPoints: 5, dueDate: addDays(today, 1), status: "review", sprintId: "sprint2", completedDate: "" },
    { id: "t5", title: "Sprint form", description: "Create sprint with dates", priority: "Medium", assignee: "Mayank", storyPoints: 3, dueDate: addDays(today, 2), status: "todo", sprintId: "sprint2", completedDate: "" },
    { id: "t6", title: "Burndown chart", description: "Ideal and actual lines", priority: "High", assignee: "Menika", storyPoints: 8, dueDate: addDays(today, 2), status: "inprogress", sprintId: "sprint2", completedDate: "" },
    { id: "t7", title: "Risk score logic", description: "Rule based score", priority: "Medium", assignee: "Manas", storyPoints: 5, dueDate: addDays(today, 3), status: "todo", sprintId: "sprint2", completedDate: "" },
    { id: "t8", title: "Write README", description: "Project description and steps", priority: "Low", assignee: "Mudit", storyPoints: 2, dueDate: "", status: "backlog", sprintId: null, completedDate: "" },
    { id: "t9", title: "Responsive layout", description: "Check mobile screens", priority: "Low", assignee: "Mudit", storyPoints: 3, dueDate: addDays(today, -1), status: "inprogress", sprintId: "sprint2", completedDate: "" },
  ];
}
