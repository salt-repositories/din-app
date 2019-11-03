import * as yup from "yup";

export interface IForgotPasswordSchema {
    email: string;
    firstPassword: string;
    secondPassword: string;
    authorizationCode: string;
}

export const initialValues: IForgotPasswordSchema = {
    email: "",
    firstPassword: "",
    secondPassword: "",
    authorizationCode: "",
};

export const forgotPasswordSchema = yup.object({
    email: yup.string()
        .email("Please enter a valid email")
        .required("Please enter a valid email"),
    firstPassword: yup.string()
        .required("Please enter a password")
        .min(8, "Password must be at least 8 characters"),
    secondPassword: yup.string()
        .required("Please repeat the password")
        .oneOf([yup.ref("password")], "The passwords must match"),
    authorizationCode: yup.string()
        .min(30,"The authorization code is at least 30 characters")
        .required("Please enter the received authorization code"),
});
