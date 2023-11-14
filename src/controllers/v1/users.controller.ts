import { NextFunction, Response } from "express";
import HTTP_STATUS_CODE from "../../utils/httpStatusCodes";
import { successRes } from "../../utils/successBase/response";
import { API_RESPONSE_MESSAGE, DEFAULT_TIMEZONE } from "../../utils/constant";
import Api400Error from "../../utils/errorBase/api400Error";
// import { g e } from "../../repository/users.repository";
import redisUtils from "../../utils/redisKeys";
import { getCache, setCache } from "../../repository/redis.repository";
import { getUsers } from "../../repository/users.repository";
import Api401Error from "../../utils/errorBase/api401Error";

const generateRandomOtp = () => {
    return Math.floor(1000 + Math.random() * 9000);
};

export const sendOtp = async (req: any, res: Response, next: NextFunction) => {
    try {
        const { mobileNumber } = req.body;

        // const users = await getUsers({
        //     where: {
        //         mobile_number: mobileNumber
        //     }
        // });
        // console.log(users);

        const generatedOtp = generateRandomOtp();
        let key = redisUtils["OTP_DATA"] + mobileNumber;
        let keyExpiryTime = redisUtils["OTP_EXPIRE_TIME"];
        await setCache(key, generatedOtp, keyExpiryTime);
        return res.status(HTTP_STATUS_CODE.OK).send(successRes({}, API_RESPONSE_MESSAGE.SUCCESS));
    } catch (error) {
        next(error);
    }
};

export const verifyOtp = async (req: any, res: Response, next: NextFunction) => {
    try {
        const { mobileNumber, otp } = req.body;

        let key = redisUtils["OTP_DATA"] + mobileNumber;
        const cachedOtp = await getCache(key);
        if(cachedOtp !== otp) {
            throw new Api401Error(API_RESPONSE_MESSAGE.UNAUTHORIZED);
        }
        // jwt logic here
        return res.status(HTTP_STATUS_CODE.OK).send(successRes({}, API_RESPONSE_MESSAGE.SUCCESS));
    } catch (error) {
        next(error);
    }
}
