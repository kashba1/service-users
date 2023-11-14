import { ERROR_MESSAGE } from "../constant";
import httpStatusCodes from "../httpStatusCodes";
import BaseError from "./baseError";

class Api404Error extends BaseError {
    constructor(description: string | undefined = ERROR_MESSAGE.NOT_FOUND, customCode: number = httpStatusCodes.NOT_FOUND, isOperational: boolean = true) {
        super(httpStatusCodes.NOT_FOUND, description, customCode);
    }
}

export default Api404Error;
