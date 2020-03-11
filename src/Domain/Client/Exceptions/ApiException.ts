import { ErrorResponse } from "../../Models/Exeptions/ErrorResponse";

export class ApiException extends Error {
    public errorObject: ErrorResponse;

    constructor(message: string, errorObject: ErrorResponse) {
        super(message);

        this.errorObject = errorObject;

        Object.setPrototypeOf(this, ApiException.prototype);
    }
}
