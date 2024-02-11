class CustomError extends Error {
    statusCode: number;
    data: null;
    errors: any;
    success: boolean;
    message: string;

    constructor(statusCode: number, message: string, stack = "") {
        super(message);
        this.statusCode = statusCode;
        this.data = null;
        this.success = false;
        this.message = message;

        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export function subError(statusCode: number, message: string) {
    throw new CustomError(statusCode, message);
}
