export type GenderType = "MALE" | "FEMALE" | "OTHER";

export type UserType = {
    [key:string]:any
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
export type UserAuthorityType = {
  authority: string;
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
  gender: string;
};

export type SignInFormPropType = {
  email: string;
  password: string;
};
