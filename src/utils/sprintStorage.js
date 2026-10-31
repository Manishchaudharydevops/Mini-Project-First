const SPRINTS_KEY = "sprints";

export function loadSprints() {
  try {
    const saved = localStorage.getItem(SPRINTS_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.log("Could not read sprints", error);
  }
  return [];
}

export function saveSprints(sprints) {
  localStorage.setItem(SPRINTS_KEY, JSON.stringify(sprints));
}
