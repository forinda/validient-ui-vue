// function to check is today or past or tomorrow
import moment from "moment";
import { DateStatusType } from "@/typings";

export const getDateStatus = (date: Date): DateStatusType => {
  const now = moment();
  const inputDate = moment(date);

  if (inputDate.isSame(now, 'day')) {
    return "today";
  } else if (inputDate.isBefore(now)) {
    const diffInDays = now.diff(inputDate, 'days');
    if (diffInDays === 1) {
      return "yesterday";
    } else if (diffInDays <= 7) {
      return "past";
    } else {
      return "unknown";
    }
  } else if (inputDate.isSame(now.clone().add(1, 'day'), 'day')) {
    return "tomorrow";
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
  }
}
