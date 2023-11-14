import { NextFunction, Response } from "express";
import HTTP_STATUS_CODE from "../../utils/httpStatusCodes";
import { successRes } from "../../utils/successBase/response";
import { API_RESPONSE_MESSAGE, DEFAULT_TIMEZONE } from "../../utils/constant";
import Api400Error from "../../utils/errorBase/api400Error";
// import { g e } from "../../repository/users.repository";
import redisUtils from "../../utils/redisKeys";
import { getCache, setCache } from "../../repository/redis.repository";
import { getUsers } from "../../repository/users.repository";
import { getRedisWriterClient } from "../../redis";

const generateRandomOtp = () => {
    return Math.floor(1000 + Math.random() * 9000).toString();
};

export const sendOtp = async (req: any, res: Response, next: NextFunction) => {
    try {
        const { mobileNumber } = req.body;

        if (!mobileNumber) {
            // custom error mobile number required
            next();
        }

        const users = await getUsers({
            where: {
                mobile_number: mobileNumber
            }
        });

        if (users) {
            // custom error - user already exists
            next();
        }

        const generatedOtp = generateRandomOtp();

        console.log(generatedOtp);

        const redisClient = await getRedisWriterClient();

        await redisClient.set(mobileNumber, generatedOtp, {
            EX: 120,
        });

        return res.status(HTTP_STATUS_CODE.OK).send(successRes({}, API_RESPONSE_MESSAGE.SUCCESS));
    } catch (error) {
        next(error);
    }
};
