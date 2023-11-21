import { NextFunction, Response } from "express";
import HTTP_STATUS_CODE from "../../utils/httpStatusCodes";
import { successRes } from "../../utils/successBase/response";
import { API_RESPONSE_MESSAGE } from "../../utils/constant";
import Api400Error from "../../utils/errorBase/api400Error";
import redisUtils from "../../utils/redisKeys";
import { getCache, setCache } from "../../repository/redis.repository";
import { createUser } from "../../repository/users.repository";
import { getUserDetail } from "./common.controller";
import { signupBusiness } from "./business.controller";
import { signupCustomer } from "./customer.controller";

const generateRandomOtp = () => {
    return Math.floor(1000 + Math.random() * 9000);
};

export const sendOtp = async (req: any, res: Response, next: NextFunction) => {
    try {
        const { mobile_number } = req.body;

        const generatedOtp = 1234; //generateRandomOtp();
        let key = redisUtils["OTP_DATA"] + mobile_number;
        let keyExpiryTime = redisUtils["OTP_EXPIRE_TIME"];
        console.log(key);
        await setCache(key, generatedOtp, keyExpiryTime);
        return res.status(HTTP_STATUS_CODE.OK).send(successRes({ generatedOtp }, API_RESPONSE_MESSAGE.SUCCESS));
    } catch (error) {
        next(error);
    }
};

export const verifyOtp = async (req: any, res: Response, next: NextFunction) => {
    try {
        const { mobile_number, otp } = req.body;

        let key = redisUtils["OTP_DATA"] + mobile_number;
        const cachedOtp = await getCache(key);
        console.log(cachedOtp);
        if(cachedOtp !== otp) {
            throw new Api400Error(API_RESPONSE_MESSAGE.INVALID);
        }
        // jwt logic here
        // const token = jwt.sign({ mobileNumber }, SECRET_KEY, { expiresIn: "1h" });
        return res.status(HTTP_STATUS_CODE.OK).send(successRes({}, API_RESPONSE_MESSAGE.SUCCESS));
    } catch (error) {
        next(error);
    }
}

export const signupUser = async (req: any, res: Response, next: NextFunction) => {
    try {
        const { name, mobile_number, user_type, email, pan, gst_no, address } = req.body;
        
        let user: any = await getUserDetail(mobile_number, user_type);

        // TO-DO: check if business or customer role exists and which account creation request is this.
        if(user && user.length) {
            throw new Api400Error(API_RESPONSE_MESSAGE.RECORD_ALREADY_EXISTS);
        }
        const newUser = {
            name,
            mobile_number,
            user_type,
            status: '1',
        };

        const createdUser = await createUser(newUser);

        const user_id: any = createdUser?.dataValues.user_id;

        if (user_type === 'business') {
            await Promise.all([
                signupBusiness(user_id, address, email, pan, gst_no),
                signupCustomer(user_id, email)
            ]);
        } else if (user_type === 'customer') {
            await signupCustomer(user_id, email);
        } else {
            // TO-DO: complete employee part
            console.log("pending");
        }
        
        return res.status(HTTP_STATUS_CODE.OK).send(successRes({}, API_RESPONSE_MESSAGE.SUCCESS));
    } catch (error) {
        next(error);
    }
}

export const signInUser = async (req: any, res: Response, next: NextFunction) => {
    try {
        
    } catch (error) {
        
    }
}