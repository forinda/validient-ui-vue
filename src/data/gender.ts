import { GenderType } from "@/typings";

const genderInfo = [
  {
    id: "Male",
    value: "MALE",
    checked: false,
  },
  {
    id: "Female",
    value: "FEMALE",
    checked: false,
  }
] satisfies Array<{
  value: GenderType;
  id: string;
  checked?: boolean;
}>;

export default genderInfo;