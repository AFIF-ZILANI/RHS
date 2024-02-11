import { Student } from "@/models/student.model";
import { Teacher } from "@/models/teacher.model";
import { apiResponse, errorResponse } from "@/utils/back/customApiResonse";
import { subError } from "@/utils/back/customError";
import { gart } from "@/utils/back/gart";
import Jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const refFromCookies = cookies().get("refreshToken")?.value;
        if (!refFromCookies) {
            var refFromBody = await request.json();
        }
        const OldRefreshToken = refFromCookies || refFromBody?.refreshToken;
        if (!OldRefreshToken) {
            subError(401, "Unauthorized request!");
        }
        const decodedData: any = Jwt.verify(
            OldRefreshToken!,
            process.env.REFRESH_TOKEN_SECRET!
        );

        if (!decodedData) {
            subError(500, "Something went wrong on decoding the Access Token!");
        }

        const student = await Student.findById(decodedData?._id);
        const teacher = await Teacher.findById(decodedData?._id);
        const user = student || teacher;

        if (!user) {
            subError(401, "Invalid Refresh Token");
        }
        if (user?.refreshToken !== OldRefreshToken) {
            subError(401, "Refresh token is expired or used!");
        }

        const { accessToken, refreshToken } = await gart(
            user._id,
            user.account!,
            "both"
        );

        cookies().set("refreshToken", refreshToken, { httpOnly: true });
        cookies().set("accessToken", accessToken, { httpOnly: true });
        return apiResponse(
            200,
            { accessToken, refreshToken },
            "Refreshed access token successfully!"
        );
    } catch (error: any) {
        return errorResponse(error.statusCode, error.message);
    }
}
