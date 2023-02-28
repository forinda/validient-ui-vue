type sideBarLink = {
  title: string;
  path: string;
  icon: string;
};

type SidebarLinkMap<T> = {
    [key: string]: T[];
};



const sidebarLinks = {
  admin: [
    {
      icon: "fa fa-dashboard",
      path: "admin",
      title: "Dashboard",
    },
    {
      icon: "fa fa-calendar",
      path: "adminAppointments",
      title: "Appointments",
    },
    {
      icon: "fa fa-user",
      path: "adminClients",
      title: "Clients",
    },
    {
      icon: "fa fa-user",
      path: "adminLawyers",
      title: "Lawyers",
    },
    {
      icon: "fa fa-users",
      path: "adminUsers",
      title: "Users",
    },
    {
      icon: "fa fa-user-shield",
      path: "adminRoles",
      title: "Roles",
    },
    {
      icon: "fa fa-lock-open",
      path: "adminPermissions",
      title: "Permissions",
    },
    {
      icon: "fa fa-user",
      path: "adminProfile",
      title: "Profile",
    },
  ],
  client: [],
  lawyer: [],
} satisfies SidebarLinkMap<sideBarLink>;

export default sidebarLinks;
