const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

/** "08-23" → "Aug 23" */
export function formatDue(mmdd: string): string {
  const [mm, dd] = mmdd.split("-").map(Number);
  return `${MONTHS[mm - 1]} ${dd}`;
}

/** Whole days from today until the deadline (negative = already passed). */
export function daysUntil(mmdd: string): number {
  const [mm, dd] = mmdd.split("-").map(Number);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  let target = new Date(now.getFullYear(), mm - 1, dd);
  // If the date is far in the past, assume it means next year
  if (target.getTime() < today.getTime() - 180 * 86400000) {
    target = new Date(now.getFullYear() + 1, mm - 1, dd);
  }
  return Math.round((target.getTime() - today.getTime()) / 86400000);
}
