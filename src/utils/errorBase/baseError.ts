class BaseError extends Error {
    statusCode: number;
    customCode: number;
    constructor(statusCode: number, description: string | undefined, customCode: number) {
        super(description);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = Error.name;
        this.statusCode = statusCode;
        this.customCode = customCode;
        Error.captureStackTrace(this);
    }
}

export default BaseError;
