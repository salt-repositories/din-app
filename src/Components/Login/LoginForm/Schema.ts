import * as yup from "yup";

export interface ILoginSchema {
    username: string;
    password: string;
}

export const loginSchema = yup.object({
    username: yup.string()
        .required("Please enter your username or email"),
    password: yup.string()
        .required("Please enter your password"),
});
