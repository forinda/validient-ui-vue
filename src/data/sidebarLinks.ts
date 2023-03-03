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
      path: "adminCalendar",
      title: "Calendar",
    },
    {
      icon: "fa fa-calendar",
      path: "adminAppointments",
      title: "Appointments",
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
      icon: "fa fa-gavel",
      path: "adminCases",
      title: "Cases",
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
    {
      icon: "fa fa-cog",
      path: "caseTypes",
      title: "Case Types",
    },
    {
      icon: "fa fa-cog",
      path: "caseStatuses",
      title: "Case Statuses",
    },
  ],
  client: [
    {
      icon: "fa fa-dashboard",
      path: "client",
      title: "Dashboard",
    },
    {
      icon: "fa fa-calendar",
      path: "clientSchedule",
      title: "Schedule",
    },
    {
      icon: "fa fa-calendar",
      path: "clientAppointments",
      title: "Appointments",
    },
  ],
  lawyer: [],
} satisfies SidebarLinkMap<sideBarLink>;

export default sidebarLinks;
