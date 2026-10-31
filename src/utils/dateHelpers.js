export function todayString() {
  const d = new Date();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return d.getFullYear() + "-" + month + "-" + day;
}

export function daysBetween(start, end) {
  const a = new Date(start);
  const b = new Date(end);
  return Math.round((b - a) / (1000 * 60 * 60 * 24));
}

export function addDays(dateString, numberOfDays) {
  const d = new Date(dateString);
  d.setUTCDate(d.getUTCDate() + numberOfDays);
  return d.toISOString().slice(0, 10);
}
