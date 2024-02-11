import { connectDB } from "@/utils/back/dbConfig";
import { apiResponse, errorResponse } from "@/utils/back/customApiResonse";
import { verifyJWT } from "@/utils/back/verifyUser";
import { NextRequest } from "next/server";
import { subError } from "@/utils/back/customError";
import { Student } from "@/models/student.model";
import { Teacher } from "@/models/teacher.model";
import { emailValidator } from "@/utils/back/emailValidator";

export async function POST(request: NextRequest) {
    try {
        const user = await verifyJWT();
        await connectDB();

        const body = await request.json();
        const newEmail = body?.email;

        if (!newEmail || newEmail === "") {
            subError(400, "new email is required!");
        }
        const emailValidation = emailValidator(newEmail);
        if (!emailValidation) {
            subError(400, "new email must be right format!");
        }

        if (user.email === newEmail) {
            subError(
                400,
                "your previous and new email is same. Try defferent!"
            );
        }

        if (user.account === "STUDENT") {
            const existed = await Student.findOne({ email: newEmail });
            if (existed) {
                subError(400, "email is already used!");
            }
            await Student.findByIdAndUpdate(
                user._id,
                {
                    $set: {
                        email: newEmail,
                    },
                },
                {
                    new: true,
                }
            );
        }
        if (user.account === "TEACHER") {
            const existed = await Teacher.findOne({ email: newEmail });
            if (existed) {
                subError(400, "email is already used!");
            }

            await Teacher.findByIdAndUpdate(
                user._id,
                {
                    $set: {
                        email: newEmail,
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
            "email changed successfully changed successfully!"
        );
    } catch (error: any) {
        return errorResponse(error.statusCode, error.message);
    }
}
