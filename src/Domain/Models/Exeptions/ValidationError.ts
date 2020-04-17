import { Expose, Transform } from "class-transformer";
import camelCase from "lodash.camelcase";

export class ValidationError {
    @Expose({ name: "error_code" })
    errorCode: string;
    @Expose({ name: "error_message" })
    errorMessage: string;
    @Expose({ name: "property_name" })
    @Transform((value) => {
        let propertyName = "";
        value.split(".").forEach((part, index) => {
            if (index !== 0) {
                propertyName += `${propertyName === "" ? "" : "."}${camelCase(part)}`;
            }
        });
        return propertyName;
    }, { toClassOnly: true })
    propertyName: string;
}
