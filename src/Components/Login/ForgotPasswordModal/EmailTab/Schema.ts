import * as yup from "yup";

export interface IEmailSchema {
    email: any;
}

export const initialValues: IEmailSchema = {
    email: "",
};

export const emailSchema = yup.object({
    email: yup.string()
        .email("Please enter a valid email")
        .required("Please enter a valid email"),
});
