import { ERROR_MESSAGE } from "../constant";
import httpStatusCodes from "../httpStatusCodes";
import BaseError from "./baseError";

class Api403Error extends BaseError {
    constructor(description: string | undefined = ERROR_MESSAGE.FORBIDDEN, customCode: number = httpStatusCodes.FORBIDDEN, isOperational: boolean = true) {
        super(httpStatusCodes.FORBIDDEN, description, customCode);
    }
}

export default Api403Error;
