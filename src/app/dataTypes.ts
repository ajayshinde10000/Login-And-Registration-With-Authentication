export interface Login{
    email: string;
    password: string;
}

export interface Register{
    name:string;
    email:string;
    password:string;
    company:string;
    role:string;
}

export interface User{
    name:string;
    email:string;
    password:string;
    company:string;
    role:string;
    isLoggedIn:boolean;
}