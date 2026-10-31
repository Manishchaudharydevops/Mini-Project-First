import { todayString } from "./dateHelpers";

export function startDrag(e, taskId) {
  e.dataTransfer.setData("text/plain", taskId);
}

export function allowDrop(e) {
  e.preventDefault();
}

export function getDroppedTaskId(e) {
  e.preventDefault();
  return e.dataTransfer.getData("text/plain");
}

export function moveTask(tasks, taskId, newStatus) {
  return tasks.map((task) => {
    if (task.id !== taskId) {
      return task;
    }
    let completedDate = task.completedDate;
    if (newStatus === "done" && !completedDate) {
      completedDate = todayString();
    }
    if (newStatus !== "done") {
      completedDate = "";
    }
    return { ...task, status: newStatus, completedDate: completedDate };
  });
}
