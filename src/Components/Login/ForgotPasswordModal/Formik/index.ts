import { FormikProps } from "formik";
import { IForgotPasswordSchema } from "./schemas";

export * from "./schemas";

export interface IFormikProps {
    formik: FormikProps<IForgotPasswordSchema>;
}
