import { SignInFormPropType, SignUpFormPropType, UserType } from "@/typings";
import jwtDecode, { JwtPayload } from "jwt-decode";

import { Router } from "vue-router";
import debounce from "@/utils/debounce";
import { defineStore } from "pinia";
import { publicAxios } from "@/api";
import { stateKeys } from "@/constants/stateKeys";

export interface AuthState {
  loading: boolean;
  errors: {
    loginErrors: string[];
    registerErrors: string[];
  };
  user: UserType | null;
  authenticated: boolean;
  accessToken: string | null;
}
const initialState: AuthState = JSON.parse(
  localStorage.getItem(stateKeys.authState)!
)
  ? JSON.parse(localStorage.getItem(stateKeys.authState)!)
  : ({
      user: null,
      loading: false,
      errors: [],
      access_token: "",
      isAuthenticated: false,
    } as unknown as AuthState);

type AuthStateTypeWithRouter = AuthState & {
  router: Router;
};

export const useAuthStore = defineStore({
  id: "authState",
  state: (): AuthState =>
    localStorage.getItem(stateKeys.authState)
      ? JSON.parse(localStorage.getItem(stateKeys.authState) as string)
      : {
          loading: false,
          errors: {
            loginErrors: [],
            registerErrors: [],
          },
          user: null,
          authenticated: false,
          accessToken: null,
        },
  getters: {
    authStateLoading: (state: AuthState) => state.loading,
    authStateErrors: (state: AuthState) => state.errors,
    authStateUser: (state: AuthState) => state.user,
    authStateAuthenticated: (state: AuthState) => state.authenticated,
    authStateAccessToken: (state: AuthState) => state.accessToken,
    authStateAccessTokenValid: (state: AuthState) => {
      const tokenDecoded = jwtDecode(state.accessToken as string) as JwtPayload;
      const currentTime = new Date().getTime() / 1000;
      return tokenDecoded.exp! > currentTime;
    },
    registrationErrors: (state: AuthState) => state.errors.registerErrors,
    loginErrors: (state: AuthState) => state.errors.loginErrors,
    authUserRoles: (state: AuthState) => {
      const roles = state.user?.roles.map((role) => role.name.toLowerCase());
      return roles;
    },
    authUserAuthorities: (state: AuthState) => {
      const authorities = state.user?.authorities.map((authority) =>
        authority.authority.toUpperCase()
      );
      return authorities;
    },
    isAdmin: (state: AuthState) => {
      const roles = state.user?.roles.map((role) => role.name.toLowerCase());
      return roles?.includes("admin");
    },
    isUser: (state: AuthState) => {
      const roles = state.user?.roles.map((role) => role.name.toLowerCase());
      return roles?.includes("user");
    },
    isLawyer: (state: AuthState) => {
      const roles = state.user?.roles.map((role) => role.name.toLowerCase());
      return roles?.includes("lawyer");
    },
  },
  actions: {
    async loginUser(user: SignInFormPropType) {
      try {
        const res = await publicAxios.post("/auth/login", user);
        const { data } = res;
        console.log(data);

        this.user = data.user;
        this.accessToken = data.token;
        this.authenticated = true;
        localStorage.setItem(stateKeys.authState, JSON.stringify(this.$state));
        alert("Login successful");
        await (this as unknown as AuthStateTypeWithRouter).router.push({
          name: "home",
        });
      } catch (err: any) {
        console.log(err);

        this.errors.loginErrors = ["Invalid username or password"];
      } finally {
        this.loading = false;
      }
    },
    async registerUser(user: SignUpFormPropType) {
      try {
        this.errors.registerErrors = [];
        const res = await publicAxios.post("/auth/register", user);
        alert("Account created successfully");
        debounce(async () => {
          await (this as unknown as AuthStateTypeWithRouter).router.push({
            name: "login",
          });
        }, 1000);
      } catch (error: any) {
        if (error.response) {
          const { data } = error.response;
          if (data.errorMessage) {
            if (
              String(data.errorMessage).toLowerCase() ===
              "Please initialize roles first".toLowerCase()
            ) {
              this.errors.registerErrors = [
                "Something went wrong, please try again later",
              ];
              console.log(this.errors.registerErrors);
              await publicAxios.post("/auth/init");
              return;
            } else {
              this.errors.registerErrors = [data.errorMessage];
              return;
            }
          }
          if (data.errors) {
            this.errors.registerErrors = data.errors;
          }
        }
      } finally {
        this.loading = false;
      }
    },
    async logoutUser() {
      this.user = null;
      this.accessToken = null;
      this.authenticated = false;
      localStorage.removeItem(stateKeys.authState);
    },
    resetErrors() {
      this.errors = {
        loginErrors: [],
        registerErrors: [],
      };
    },
  },
});

export default useAuthStore;
