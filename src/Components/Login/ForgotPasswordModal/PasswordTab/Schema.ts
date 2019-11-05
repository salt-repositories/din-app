import * as yup from "yup";

export interface IPasswordSchema {
    password: string;
    repeatPassword: string;
    authorizationCode: string;
}

export const initialValues: IPasswordSchema = {
    password: "",
    repeatPassword: "",
    authorizationCode: "",
};

export const passwordSchema = yup.object({
    password: yup.string()
        .required("Please enter a password")
        .min(8, "Password must be at least 8 characters"),
    repeatPassword: yup.string()
        .required("Please repeat the password")
        .oneOf([yup.ref("password")], "The passwords must match"),
    authorizationCode: yup.string()
        .min(30,"The authorization code is at least 30 characters")
        .required("Please enter the received authorization code"),
});
