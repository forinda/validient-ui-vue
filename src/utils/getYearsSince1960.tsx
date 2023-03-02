
export default function getYearsSince1960() {
  const years = [];
  for (let i = 1960; i <= new Date().getFullYear(); i++) {
    years.push(i);
  }
  return years;
}