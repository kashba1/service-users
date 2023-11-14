import { ERROR_MESSAGE } from "../constant";
import httpStatusCodes from "../httpStatusCodes";
import BaseError from "./baseError";

class Api501Error extends BaseError {
    constructor(description: string | undefined = ERROR_MESSAGE.NOT_IMPLEMENT, customCode: number = httpStatusCodes.NOT_IMPLEMENT, isOperational: boolean = true) {
        super(httpStatusCodes.NOT_IMPLEMENT, description, customCode);
    }
}

export default Api501Error;
