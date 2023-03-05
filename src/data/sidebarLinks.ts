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
      icon: "fa fa-calendar",
      path: "adminSchedules",
      title: "Schedules",
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
      path: "clientSchedules",
      title: "Schedule",
    },
    {
      icon: "fa fa-calendar",
      path: "clientAppointments",
      title: "Appointments",
    },
  ],
  lawyer: [
    {
      icon: "fa fa-dashboard",
      path: "lawyer",
      title: "Dashboard",

    },
    {
      icon: "fa fa-calendar",
      path: "lawyerCases",
      title: "Cases",
    },
    {
      icon: "fa fa-calendar",
      path: "lawyerSchedules",
      title: "Schedules",
    },
    {
      icon: "fa fa-calendar",
      path: "lawyerAppointments",
      title: "Appointments",
    },
    {
      icon: "fa fa-user",
      path: "lawyerProfile",
      title: "Profile",
    }
  
  ],
} satisfies SidebarLinkMap<sideBarLink>;

export default sidebarLinks;
