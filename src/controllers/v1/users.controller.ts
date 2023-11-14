import { NextFunction, Response } from "express";
import HTTP_STATUS_CODE from "../../utils/httpStatusCodes";
import { successRes } from "../../utils/successBase/response";
import { API_RESPONSE_MESSAGE, DEFAULT_TIMEZONE } from "../../utils/constant";
import Api400Error from "../../utils/errorBase/api400Error";
// import { g e } from "../../repository/users.repository";
import redisUtils from "../../utils/redisKeys";
import { getCache, setCache } from "../../repository/redis.repository";

export const sendOtp = async (req: any, res: Response, next: NextFunction) => {
    try {
        return res.status(HTTP_STATUS_CODE.OK).send(successRes({}, API_RESPONSE_MESSAGE.SUCCESS));
    } catch (error) {
        next(error);
    }
};
