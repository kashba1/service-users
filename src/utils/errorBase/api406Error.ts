import { ERROR_MESSAGE } from "../constant";
import httpStatusCodes from "../httpStatusCodes";
import BaseError from "./baseError";

class Api406Error extends BaseError {
    constructor(description: string | undefined = ERROR_MESSAGE.NOT_ACCEPTABLE, customCode: number = httpStatusCodes.NOT_ACCEPTABLE, isOperational: boolean = true) {
        super(httpStatusCodes.NOT_ACCEPTABLE, description, customCode);
    }
}

export default Api406Error;
