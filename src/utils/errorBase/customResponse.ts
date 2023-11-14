import httpStatusCodes from "../httpStatusCodes";
import BaseError from "./baseError";

class ApiCustomResponse extends BaseError {
    constructor(
        name: string,
        statusCode: number = httpStatusCodes.NOT_FOUND,
        description: string | undefined = "Not found.",
        customCode: number = httpStatusCodes.NOT_FOUND,
        isOperational: boolean = true
    ) {
        super(statusCode, description, customCode);
    }
}

export default ApiCustomResponse;
