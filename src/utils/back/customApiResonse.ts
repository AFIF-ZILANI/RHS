import { NextResponse } from "next/server";

class CustomResponse {
    statusCode: number;
    data: object;
    message: string;
    success: boolean;

    constructor(statusCode: number, data: object, message: string) {
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.success = statusCode < 400;
    }
}

export function apiResponse(statusCode: number, data: object, message: string) {
    return NextResponse.json(new CustomResponse(statusCode, data, message));
}
export function errorResponse(statusCode: number, message: string) {
    console.log(message);
    return NextResponse.json(
        {
            status: statusCode || 500,
            message: message || "Something went wrong!",
            success: false,
        },
        { status: statusCode || 500 }
    );
}
