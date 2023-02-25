import { stateKeys } from '@/constants/stateKeys'
import { UserStateType } from '@/typings'
import { defineStore } from 'pinia'

export interface AuthState {
    loading: boolean
    error: string | null
    user: UserStateType | null
    authenticated: boolean
    accessToken: string | null
}

export const useAuthState = defineStore({
    id: 'authState',
    state: (): AuthState => (
    localStorage.getItem(stateKeys.authState) ? 
    JSON.parse(localStorage.getItem(stateKeys.authState) as string) : {
        loading: false,
        error: null,
        user: null,
        authenticated: false,
        accessToken: null
    }),
    getters: {
        authStateLoading: (state: AuthState) => state.loading,
        authStateError: (state: AuthState) => state.error,
        authStateUser: (state: AuthState) => state.user,
        authStateAuthenticated: (state: AuthState) => state.authenticated,
        authStateAccessToken: (state: AuthState) => state.accessToken
    },
    actions: {
        loginUserStart() {
            this.loading = true
            this.error = null
        },
        loginUserSuccess(user: UserStateType, accessToken: string) {
            this.user = user
            this.authenticated = true
            this.accessToken = accessToken
        },
        loginUserFailure(error: string) {
            this.error = error
        },
        logoutUser() {
            this.user = null
            this.authenticated = false
            this.accessToken = null
        }
    }
})

