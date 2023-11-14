import { ERROR_MESSAGE } from "../constant";
import httpStatusCodes from "../httpStatusCodes";
import BaseError from "./baseError";

class Api500Error extends BaseError {
    constructor(description: string | undefined = ERROR_MESSAGE.INTERNAL_SERVER, customCode: number = httpStatusCodes.INTERNAL_SERVER, isOperational: boolean = true) {
        super(httpStatusCodes.INTERNAL_SERVER, description, customCode);
    }
}

export default Api500Error;
