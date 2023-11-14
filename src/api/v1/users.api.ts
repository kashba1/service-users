import { Express } from "express";
import { authJwt, valHan, epoch, } from "../../middleware";
import { sendOtp } from "../../controllers/v1/users.controller";
// import { SYNC_CONFIG } from "../../validationConfig/config";

const router = (app: Express, options: any, urlSegment: string) => {
    // app.post(`${urlSegment}/sync`, [epoch.epochCheck, authJwt.deviceAuth, vendorCheck.checkVendorUsers, epoch.timeZoneCheck, valHan.validationHandler(SYNC_CONFIG)], multiSync);
    app.post(`${urlSegment}/send-otp`, sendOtp)

};

export default router;
