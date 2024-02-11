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
        const newPhone: string = body?.phone;

        if (!newPhone || newPhone === "") {
            subError(400, "new phone number is required!");
        }

        if (user.phone === newPhone) {
            subError(
                400,
                "your previous and new phone number is same. Try defferent!"
            );
        }

        if (user.account === "STUDENT") {
            const existed = await Student.findOne({ phone: newPhone });
            if (existed) {
                subError(400, "phone number is already used!");
            }
            await Student.findByIdAndUpdate(
                user._id,
                {
                    $set: {
                        phone: newPhone,
                    },
                },
                {
                    new: true,
                }
            );
        }
        if (user.account === "TEACHER") {
            const existed = await Teacher.findOne({ phone: newPhone });
            if (existed) {
                subError(400, "phone number is already used!");
            }

            await Teacher.findByIdAndUpdate(
                user._id,
                {
                    $set: {
                        phone: newPhone,
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
            "phone number changed successfully changed successfully!"
        );
    } catch (error: any) {
        return errorResponse(error.statusCode, error.message);
    }
}
