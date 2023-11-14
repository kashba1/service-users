import { ERROR_MESSAGE } from "../constant";
import httpStatusCodes from "../httpStatusCodes";
import BaseError from "./baseError";

class Api405Error extends BaseError {
    constructor(description: string | undefined = ERROR_MESSAGE.METHOD_NOT_ALLOW, customCode: number = httpStatusCodes.METHOD_NOT_ALLOW, isOperational: boolean = true) {
        super(httpStatusCodes.METHOD_NOT_ALLOW, description, customCode);
    }
}

export default Api405Error;
