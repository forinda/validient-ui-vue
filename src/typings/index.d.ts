export type GenderType = "MALE" | "FEMALE" | "OTHER";

export type UserType = {
  [key: string]: any;
  id: number;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  avatar: string | null;
  gender: GenderType;
  roles: UserRoleType[];
  enabled: boolean;
  authorities: UserAuthorityType[];
  accountNonExpired: boolean;
  accountNonLocked: boolean;
  credentialsNonExpired: boolean;
};
export type LawyerTypes = {
  [key: string]: any;
  id: number;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  avatar: string | null;
  gender: GenderType;
  caseType: string;
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

export type LawyerType = {
  id: number;
  verifiedYear: number;
  hourlyRate: number;
  practiceAreas: string;
  notes: string;
  identification: string;
  specialization: CaseType[];
};

export type CaseType = {
  id: number;
  name: string;
  description: string;
};

  export type AppointmentType = {
    title: string;
    description: string;
    year: number;
    month: number;
    date: number;
    startHour: number;
    startMinute: number;
    owner: number;
    members: number[];
  }
  export type ScheduleType = {
    id: number;
    title: string;
    description: string;
    year: number;
    month: number;
    date: number;
    startHour: number;
    startMinute: number;
  };