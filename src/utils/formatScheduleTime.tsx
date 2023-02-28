export default function formatScheduleTime(props: {
  year: number;
  month: number;
  date: number;
  startHour: number;
  startMinute: number;
}) {
  return new Date(
    props.year,
    props.month-1,
    props.date,
    props.startHour,
    props.startMinute
  );
}
