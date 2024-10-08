export function formatDateToHoursAndMinutes(d: string | number | Date): string {
  const date = new Date(d);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${hours}:${minutes}`;
}
