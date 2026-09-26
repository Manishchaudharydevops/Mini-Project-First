import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { generateId } from "../utils/id";
import { STORAGE_KEYS, loadFromStorage, saveToStorage } from "../utils/storage";
import { computeSprintStats } from "../utils/sprintStats";

const AppContext = createContext(null);

export const BOARD_COLUMNS = [
  { key: "backlog", label: "Backlog" },
  { key: "todo", label: "To Do" },
  { key: "inprogress", label: "In Progress" },
  { key: "review", label: "Review" },
  { key: "done", label: "Done" },
];

export function AppProvider({ children }) {
  const [tasks, setTasks] = useState(() => loadFromStorage(STORAGE_KEYS.TASKS, []));
  const [sprints, setSprints] = useState(() => loadFromStorage(STORAGE_KEYS.SPRINTS, []));
  const [activeSprintId, setActiveSprintId] = useState(() =>
    loadFromStorage(STORAGE_KEYS.ACTIVE_SPRINT, null)
  );
  const [burndownLog, setBurndownLog] = useState(() =>
    loadFromStorage(STORAGE_KEYS.BURNDOWN_LOG, {})
  );

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.TASKS, tasks);
  }, [tasks]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.SPRINTS, sprints);
  }, [sprints]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.ACTIVE_SPRINT, activeSprintId);
  }, [activeSprintId]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.BURNDOWN_LOG, burndownLog);
  }, [burndownLog]);

  const activeSprint = useMemo(
    () => sprints.find((s) => s.id === activeSprintId) || null,
    [sprints, activeSprintId]
  );

  useEffect(() => {
    if (!activeSprint) return;
    const todayKey = new Date().toISOString().slice(0, 10);
    const stats = computeSprintStats(tasks, activeSprint.id);
    setBurndownLog((prev) => {
      const sprintLog = prev[activeSprint.id] || {};
      if (sprintLog[todayKey] === stats.remainingPoints) return prev;
      return {
        ...prev,
        [activeSprint.id]: { ...sprintLog, [todayKey]: stats.remainingPoints },
      };
    });
  }, [tasks, activeSprint]);

  function addTask(taskData) {
    const newTask = {
      id: generateId("task"),
      title: taskData.title,
      description: taskData.description || "",
      priority: taskData.priority || "Medium",
      assignee: taskData.assignee || "",
      storyPoints: Number(taskData.storyPoints) || 0,
      dueDate: taskData.dueDate || "",
      status: taskData.status || "backlog",
      sprintId: taskData.sprintId || null,
      createdAt: new Date().toISOString(),
    };
    setTasks((prev) => [...prev, newTask]);
  }

  function updateTask(taskId, updates) {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, ...updates } : t))
    );
  }

  function deleteTask(taskId) {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
  }

  function moveTaskStatus(taskId, newStatus) {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t))
    );
  }

  function createSprint(sprintData) {
    if (activeSprintId) {
      completeSprint(activeSprintId);
    }
    const newSprint = {
      id: generateId("sprint"),
      name: sprintData.name,
      startDate: sprintData.startDate,
      endDate: sprintData.endDate,
      status: "active",
      velocity: null,
      completedAt: null,
    };
    setSprints((prev) => [...prev, newSprint]);
    setActiveSprintId(newSprint.id);
  }

  function completeSprint(sprintId) {
    setSprints((prev) =>
      prev.map((s) => {
        if (s.id !== sprintId) return s;
        const stats = computeSprintStats(tasks, sprintId);
        return {
          ...s,
          status: "completed",
          velocity: stats.completedPoints,
          completedAt: new Date().toISOString(),
        };
      })
    );
    setActiveSprintId((current) => (current === sprintId ? null : current));
  }

  const value = {
    tasks,
    sprints,
    activeSprint,
    activeSprintId,
    burndownLog,
    addTask,
    updateTask,
    deleteTask,
    moveTaskStatus,
    createSprint,
    completeSprint,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
}
