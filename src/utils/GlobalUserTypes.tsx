type UserTypeRoles = "admin" | "lawyer" | "user";

// infer user type from user roles
type GlobalUserTypes = {
  [K in UserTypeRoles]: K;
}[UserTypeRoles];


export default GlobalUserTypes;
