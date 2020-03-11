import * as yup from "yup";

export interface ILoginSchema {
    username: string;
    password: string;
    rememberUsername: boolean;
}

export const loginSchema = yup.object({
    username: yup.string()
        .required("Please enter your username or email"),
    password: yup.string()
        .min(8, "Password is at least 8 characters")
        .required("Please enter your password"),
});
