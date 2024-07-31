const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const truncated_months = [
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
export function getFormattedTodayDate(truncated?: boolean) {
  const today = new Date();
  return getFormattedDayMonth(today, truncated);
}

export function getFormattedDayMonth(date: Date, truncated?: boolean) {
  const day = date.getDate();
  const monthIndex = date.getMonth();
  const monthName = truncated
    ? truncated_months[monthIndex]
    : months[monthIndex];

  return `${day} ${monthName}`;
}

export function getFormattedDate(date: Date, truncated?: boolean) {
  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();
  const monthName = truncated
    ? truncated_months[monthIndex]
    : months[monthIndex];

  return `${year} ${monthName} ${day}`;
}

export function getFormattedMonth(date: Date, truncated?: boolean) {
  const monthIndex = date.getMonth();
  return truncated ? truncated_months[monthIndex] : months[monthIndex];
}

export function getFormattedDay(date: Date) {
  return date.getDate();
}
