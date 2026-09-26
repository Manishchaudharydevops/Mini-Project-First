export const STORAGE_KEYS = {
  TASKS: "aps_tasks",
  SPRINTS: "aps_sprints",
  ACTIVE_SPRINT: "aps_active_sprint",
  BURNDOWN_LOG: "aps_burndown_log",
};

export function loadFromStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null || raw === undefined) return fallback;
    return JSON.parse(raw);
  } catch (error) {
    return fallback;
  }
}

export function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    return false;
  }
}
