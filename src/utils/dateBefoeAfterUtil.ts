// function to check is today or past or tomorrow
import moment from "moment";
type StatusType =
  | "today"
  | "past"
  | "tomorrow"
  | "upcoming"
  | "yesterday"
  | "this week"
  | "next week"
  | "this month"
  | "next month"
  | "this year"
  | "next year"
  | "unknown"

export const getDateStatus = (date: Date): StatusType => {
    const now = moment();
    const inputDate = moment(date);
  
    if (inputDate.isSame(now, 'day')) {
      return "today";
    } else if (inputDate.isSameOrBefore(now)) {
      return "past";
    } else if (inputDate.isSame(now.clone().add(1, 'day'), 'day')) {
      return "tomorrow";
    } else if (inputDate.isSameOrBefore(now.clone().add(7, 'days'))) {
      return "upcoming";
    } else if (inputDate.isSame(now.clone().subtract(1, 'day'), 'day')) {
      return "yesterday";
    } else if (inputDate.isSameOrBefore(now.clone().endOf('week'))) {
      return "this week";
    } else if (inputDate.isSameOrBefore(now.clone().add(1, 'week').endOf('week'))) {
      return "next week";
    } else if (inputDate.isSameOrBefore(now.clone().endOf('month'))) {
      return "this month";
    } else if (inputDate.isSameOrBefore(now.clone().add(1, 'month').endOf('month'))) {
      return "next month";
    } else if (inputDate.isSameOrBefore(now.clone().endOf('year'))) {
      return "this year";
    } else if (inputDate.isSameOrBefore(now.clone().add(1, 'year').endOf('year'))) {
      return "next year";
    } else {
      return "unknown";
}}
