import { NextFunction, Request, Response } from "express";
import os from "os";
import { Sequelize, BaseError as sequelizeBaseError } from "sequelize";
const redis = require("redis");
import config from "../../config";
import { DEFAULT_TIMEZONE, IST_DATE_FORMAT } from "../constant";
import { modifyDateFormat } from "../date_format";
import { getAPMInstance } from "../../logger/apm";
import getLogger from "../../logger/winston";

export const logError = (err: any): void => {
    console.log(err);
};

export const logErrorMiddleware = (err: any, req: Request, res: Response, next: NextFunction): void => {
    logError(err);
    next(err);
};

export const returnError = (err: any, req: any, res: Response, next: NextFunction): any => {
    logError(err);
    getAPMInstance().captureError(err);
    sendErrorLogs(err, req);
    let status: number;
    let customCode: number;
    let response: any;
    if (Array.isArray(err)) {
        if (err[0].response) {
            err[0].statusCode = err[0]?.response?.status || 400;
            err[0].message = err[0]?.response?.data?.errors?.message || "something went wrong";
        }
        status = err[0].statusCode || 400;
        customCode = err[0].customCode || status;
        response = {
            success: false,
            errors: [],
        };
        for (let i = 0; i < err.length; i++) {
            response.errors.push({
                message: err[i].message,
                statusCode: err[i].status || 400,
            });
        }
    } else {
        if (err.response) {
            err.statusCode = err?.response?.status || 400;
            err.message = err?.response?.data?.errors?.message || "something went wrong";
        }
        status = err.statusCode || 400;
        customCode = err.customCode || status;
        response = {
            success: false,
            errors: {
                message: err.message,
                statusCode: status,
            },
        };
    }
    if (req.auth) {
        response.auth = req.auth;
    }
    response.time = "" + new Date().getTime();
    req.isError = true;
    return res.status(status).send(response);
};

export const notFound = (req: any, res: Response, next: NextFunction): any => {
    if (req.isError) {
        return next();
    }
    const status = 404;
    return res.status(status).send({
        success: false,
        errors: {
            message: "Route not found",
            statusCode: status,
        },
    });
};

export const isOperationalError = (error: any): boolean => {
    if (error) {
        return error.isOperational;
    }
    return false;
};

function sendErrorLogs(err: any, req: Request) {
    return new Promise<any>(async (resolve, reject) => {
        try {
            const hostname = os.hostname();
            let errorLogObj: any = {
                "service-name": config.SERVICE_NAME,
                hostname: hostname,
                timestamp: modifyDateFormat(new Date(), IST_DATE_FORMAT, DEFAULT_TIMEZONE),
                message: err.message || err,
            };
            if (req.url) {
                errorLogObj.url = req.url;
            }
            if (req.method) {
                errorLogObj.method = req.method;
            }
            if (req.body) {
                errorLogObj.body = req.body;
            }
            if (req.params) {
                errorLogObj.params = req.params;
            }
            if (req.query) {
                errorLogObj.query = req.query;
            }
            if (
                err instanceof sequelizeBaseError ||
                err instanceof redis.ErrorReply ||
                err instanceof redis.ConnectionTimeoutError ||
                (err.code === "ECONNABORTED" && err.message.includes("timeout"))
            ) {
                errorLogObj.errType = "critical";
                if (err instanceof sequelizeBaseError) {
                    errorLogObj.source = "sequelize";
                } else if (err instanceof redis.ErrorReply || err instanceof redis.ConnectionTimeoutError) {
                    errorLogObj.source = "redis";
                } else {
                    errorLogObj.source = "service";
                }
            } else {
                errorLogObj.errType = "warning";
            }
            getLogger().error(errorLogObj);
            resolve(true);
        } catch (error) {
            reject(error);
        }
    });
}
