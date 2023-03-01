export default function filterUserRoles(roles: string[]) {
  type Role = "admin" | "user" | "lawyer";
  type RolePriorityMap = {
    [key in Role]: number;
  };
  const rolePriorityMap: RolePriorityMap = {
    admin: 1,
    lawyer: 2,
    user: 3,
  };
  const sortedRoles = roles.sort((a, b) => {
    return rolePriorityMap[a as Role] - rolePriorityMap[b as Role];
  });
  return sortedRoles[0];
}
