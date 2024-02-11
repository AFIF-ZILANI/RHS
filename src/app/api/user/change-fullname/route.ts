import { connectDB } from "@/utils/back/dbConfig";
import { apiResponse, errorResponse } from "@/utils/back/customApiResonse";
import { verifyJWT } from "@/utils/back/verifyUser";
import { NextRequest } from "next/server";
import { subError } from "@/utils/back/customError";
import { Student } from "@/models/student.model";
import { Teacher } from "@/models/teacher.model";

export async function POST(request: NextRequest) {
    try {
        const user = await verifyJWT();
        await connectDB();

        const body = await request.json();
        const newFullName: string = body?.fullName;

        if (!newFullName || newFullName === "") {
            subError(400, "full name is required!");
        }

        if (user.fullName === newFullName) {
            subError(
                400,
                "your previous and new full name is same. Try defferent!"
            );
        }

        if (user.account === "STUDENT") {
            await Student.findByIdAndUpdate(
                user._id,
                {
                    $set: {
                        fullName: newFullName,
                    },
                },
                {
                    new: true,
                }
            );
        }
        if (user.account === "TEACHER") {
            await Teacher.findByIdAndUpdate(
                user._id,
                {
                    $set: {
                        fullName: newFullName,
                    },
                },
                {
                    new: true,
                }
            );
        }
        return apiResponse(
            200,
            {},
            "full name changed successfully changed successfully!"
        );
    } catch (error: any) {
        return errorResponse(error.statusCode, error.message);
    }
}
