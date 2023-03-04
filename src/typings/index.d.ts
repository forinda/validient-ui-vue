export type GenderType = "MALE" | "FEMALE" //| "OTHER";
export type LawyerHourlyRateType = {
  id: number;
  label: string;
  rate: number;
  maxYears: number;
};
export type DateStatusType =
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
export type NewLawyerType = {
  verifiedYear: number;
  hourlyRate: number;
  practiceAreas: string;
  notes: string;
  caseType: number;
};

export type LawyerType = {
  id: number;
  verifiedYear: number;
  hourlyRate: number;
  practiceAreas: string;
  notes: string;
  identification: string;
  caseType: CaseType;
  user: UserType;
};

export type UserType = {
  [key: string]: any;
  id: number;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  avatar: string;
  gender: GenderType;
  roles: UserRoleType[];
  enabled: boolean;
  authorities: UserAuthorityType[];
  accountNonExpired: boolean;
  accountNonLocked: boolean;
  credentialsNonExpired: boolean;
};
export type ClientTypes = {
  [key: string]: any;
  id: number;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  avatar: string | null;
  gender: GenderType;
};
export type UserAuthorityType = {
  authority: string;
};

export type RouteMetaType = {
  title: string;
  requiresAuth: boolean;
  authorities: string[];
  roles: string[];
};

export type UserRoleType = {
  id: number;
  name: string;
  description: string;
  isDefault: boolean;
};

export type HeaderLinksType = {
  authorized: Array<{
    name: string;
    href: string;
  }>;
  unauthorized: Array<{
    name: string;
    href: string;
  }>;
};

export type SignUpFormPropType = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  acceptTerms: boolean;
  gender: GenderType;
  avatar: "";
  username: string;
};

export type SignInFormPropType = {
  username: string;
  password: string;
};

export type CaseType = {
  id: number;
  name: string;
  description: string;
};
export type CaseStatusType = {
  id: number;
  name: string;
  description: string;
};

export type NewAppointmentType = {
  title: string;
  description: string;
  year: number;
  month: number;
  date: number;
  startHour: number;
  startMinute: number;
  owner: number;
  members: number[];
};

export type AppointmentType = {
  id: number;
  title: string;
  description: string;
  year: number;
  month: number;
  date: number;
  startHour: number;
  startMinute: number;
  owner: number;
  members: number[];
};
export type NewScheduleType = {
  title: string;
  description: string;
  year: number;
  month: number;
  date: number;
  startHour: number;
  startMinute: number;
};
  export type ScheduleType = {
  id: number;
  title: string;
  description: string;
  year: number;
  month: number;
  date: number;
  startHour: number;
  startMinute: number;
  user: UserType;
};
export type CaseDefendantType = {
  id: number;
  firstName: string;
  lastName: string;
  identity: string;
};

export type NewCaseFilingType = {
  title: string;
  description: string;
  caseType: number;
  status: number;
  lawyer: number;
  dateFiled: string;
};

export type CaseFilingType = {
  id: number;
  title: string;
  description: string;
  dateFiled: string;
  caseId: string;
  caseType: CaseType;
  status: CaseStatusType;
  lawyer: LawyerType;
  plaintiff: UserType;
};


export type AppointmentType = {
  id: number;
  title: string;
  description: string;
  year: number;
  month: number;
  date: number;
  startHour: number;
  startMinute: number;
  owner: number;
  members: Array<number | UserType>;
};
