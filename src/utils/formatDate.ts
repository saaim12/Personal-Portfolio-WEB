/** Format a case-study publication date without shifting date-only values to UTC. */
export function formatDate(date: string) {
  return new Date(date.includes("T") ? date : `${date}T00:00:00`).toLocaleString("en-us", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
