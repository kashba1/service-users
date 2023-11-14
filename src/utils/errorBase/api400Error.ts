import { ERROR_MESSAGE } from "../constant";
import httpStatusCodes from "../httpStatusCodes";
import BaseError from "./baseError";

class Api400Error extends BaseError {
    constructor(description: string | undefined = ERROR_MESSAGE.BAD_REQUEST, customCode: number = httpStatusCodes.BAD_REQUEST, isOperational: boolean = true) {
        super(httpStatusCodes.BAD_REQUEST, description, customCode);
    }
}

export default Api400Error;
