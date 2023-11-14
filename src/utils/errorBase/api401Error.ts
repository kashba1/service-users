import { ERROR_MESSAGE } from "../constant";
import httpStatusCodes from "../httpStatusCodes";
import BaseError from "./baseError";

class Api401Error extends BaseError {
    constructor(description: string | undefined = ERROR_MESSAGE.UNAUTHORIZED, customCode: number = httpStatusCodes.UNAUTHORIZED, isOperational: boolean = true) {
        super(httpStatusCodes.UNAUTHORIZED, description, customCode);
    }
}

export default Api401Error;
