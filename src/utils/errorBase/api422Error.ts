import { ERROR_MESSAGE } from "../constant";
import httpStatusCodes from "../httpStatusCodes";
import BaseError from "./baseError";

class Api422Error extends BaseError {
    constructor(description: string | undefined = ERROR_MESSAGE.UNPROCESSABLE_ENTITY, customCode: number = httpStatusCodes.UNPROCESSABLE_ENTITY, isOperational: boolean = true) {
        super(httpStatusCodes.UNPROCESSABLE_ENTITY, description, customCode);
    }
}

export default Api422Error;
