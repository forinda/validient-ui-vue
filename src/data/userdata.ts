import { UserType } from "@/typings";

export const users: UserType[] = [
  {
    id: 1,
    email: "mk12@gmail.com",
    username: "mk2",
    firstName: "Mike",
    lastName: "Mk2",
    avatar: "https://xsgames.co/randomusers/assets/avatars/male/10.jpg",
    gender: "MALE",
    roles: [
      {
        id: 3,
        name: "user",
        description: "User role",
        isDefault: true,
      }, {
        id: 1,
        name: "admin",
        description: "Admin role",
        isDefault: true,
      },
    ],
    enabled: true,
    authorities: [
      {
        authority: "USER",
       
      },{
        authority: "ADMIN",
      }
    ],
    accountNonExpired: true,
    accountNonLocked: true,
    credentialsNonExpired: true,
  },
  {
    id: 2,
    email: "janedoe@gmail.com",
    username: "janedoe",
    firstName: "Jane",
    lastName: "Doe",
    avatar: "https://xsgames.co/randomusers/assets/avatars/female/20.jpg",
    gender: "FEMALE",
    roles: [
      {
        id: 3,
        name: "user",
        description: "User role",
        isDefault: true,
      },
    ],
    enabled: true,
    authorities: [
      {
        authority: "USER",
      },
    ],
    accountNonExpired: true,
    accountNonLocked: true,
    credentialsNonExpired: true,
  },
  {
    id: 3,
    email: "forinda82@gmail.com",
    username: "forinda",
    firstName: "Felix",
    lastName: "Orinda",
    avatar: "https://xsgames.co/randomusers/assets/avatars/male/30.jpg",
    gender: "MALE",
    roles: [
      {
        id: 1,
        name: "admin",
        description: "admin role",
        isDefault: true,
      },
    ],
    enabled: true,
    authorities: [
      {
        authority: "ADMIN",
      },
    ],
    accountNonExpired: true,
    accountNonLocked: true,
    credentialsNonExpired: true,
  },
  {
    id: 4,
    email: "rose8@gmail.com",
    username: "nyaugenya",
    firstName: "Rose",
    lastName: "Odhiambo",
    avatar: "https://xsgames.co/randomusers/assets/avatars/female/22.jpg",
    gender: "FEMALE",
    roles: [
      {
        id: 3,
        name: "user",
        description: "User role",
        isDefault: true,
      },
    ],
    enabled: true,
    authorities: [
      {
        authority: "USER",
      },
    ],
    accountNonExpired: true,
    accountNonLocked: true,
    credentialsNonExpired: true,
  },
];
