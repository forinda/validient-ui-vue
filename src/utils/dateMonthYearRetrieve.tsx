export function dateMonthYearRetrieve(dateInput: Date) {
  const date = new Date(dateInput).getDate();
  const month = new Date(dateInput).getMonth() + 1;
  const year = new Date(dateInput).getFullYear();
  return { date, month, year };
}
