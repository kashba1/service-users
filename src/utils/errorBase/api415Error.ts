import { ERROR_MESSAGE } from "../constant";
import httpStatusCodes from "../httpStatusCodes";
import BaseError from "./baseError";

class Api415Error extends BaseError {
    constructor(description: string | undefined = ERROR_MESSAGE.UNSUPPORT_MEDIA_TYPE, customCode: number = httpStatusCodes.UNSUPPORT_MEDIA_TYPE, isOperational: boolean = true) {
        super(httpStatusCodes.UNSUPPORT_MEDIA_TYPE, description, customCode);
    }
}

export default Api415Error;
