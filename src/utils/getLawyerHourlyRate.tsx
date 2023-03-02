import { LawyerHourlyRateType } from "@/typings";

const getLawyerHourlyRate = () => {
  const hourlyRate = [
    {
      id: 1,
      label: "0-5 years",
      rate: 100,
      maxYears: 5,
    },
    {
      id: 2,
      label: "5-10 years",
      rate: 150,
      maxYears: 10,
    },
    {
      id: 3,
      label: "10-15 years",
      rate: 200,
      maxYears: 15,
    },
    {
      id: 4,
      label: "15-20 years",
      rate: 250,
      maxYears: 20,
    },
    {
      id: 5,
      label: "20+ years",
      rate: 300,
      maxYears: 100,
    },
  ] satisfies LawyerHourlyRateType[];
  return hourlyRate;
};

export default getLawyerHourlyRate;
