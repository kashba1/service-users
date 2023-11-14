import { ERROR_MESSAGE } from "../constant";
import httpStatusCodes from "../httpStatusCodes";
import BaseError from "./baseError";

class Api412Error extends BaseError {
    constructor(description: string | undefined = ERROR_MESSAGE.PRECONDITION_FAIL, customCode: number = httpStatusCodes.PRECONDITION_FAIL, isOperational: boolean = true) {
        super(httpStatusCodes.PRECONDITION_FAIL, description, customCode);
    }
}

export default Api412Error;
