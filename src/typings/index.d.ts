export type UserStateType = {
    name: string;
    age: number;
    email: string;
    active: boolean;
};

export type HeaderLinksType = {
    authorized:Array<{
        name: string
        href: string
    }>
    unauthorized:Array<{
        name: string
        href: string
    }>
}

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