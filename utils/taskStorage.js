const TASKS_KEY = "tasks";

export function loadTasks() {
  try {
    const saved = localStorage.getItem(TASKS_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.log("Could not read tasks", error);
  }
  return [];
}

export function saveTasks(tasks) {
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
}
