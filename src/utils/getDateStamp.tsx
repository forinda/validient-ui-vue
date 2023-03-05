import moment from "moment";
import { dateMonthYearRetrieve } from "./dateMonthYearRetrieve";
import formatScheduleTime from "./formatScheduleTime";

type ScheduleStatsKeys =
  | "today"
  | "upcoming"
  | "past"
  | "thisWeek"
  | "thisMonth"
  | "thisYear"
  | "nextWeek"
  | "tomorrow"
  | undefined;

export function getDateStamp(schedule: any): ScheduleStatsKeys {
  const { year, month, date } = dateMonthYearRetrieve(
    formatScheduleTime(schedule)
  );
  const today = moment();
  if (
    year === today.year() &&
    month === today.month() + 1 &&
    date === today.date()
  ) {
    return "today";
  }
  if (
    year === today.year() &&
    month === today.month() + 1 &&
    date === today.date()
  ) {
    return "tomorrow";
  }
  if (
    year === today.year() &&
    month === today.month() + 1 &&
    date > today.date()
  ) {
    return "upcoming";
  }
  if (
    year === today.year() &&
    month === today.month() + 1 &&
    date < today.date()
  ) {
    return "past";
  }
  if (year === today.year() && month > today.month() + 1) {
    return "upcoming";
  }
  if (year === today.year() && month < today.month() + 1) {
    return "past";
  }
  if (year > today.year()) {
    return "upcoming";
  }
  if (year < today.year()) {
    return "past";
  }
  if (year === today.year() && month === today.month()  + 1) {
    return "nextWeek";
  }
 
  return undefined;
}
