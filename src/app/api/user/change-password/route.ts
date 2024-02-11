import { connectDB } from "@/utils/back/dbConfig";
import { apiResponse, errorResponse } from "@/utils/back/customApiResonse";
import { verifyJWT } from "@/utils/back/verifyUser";
import { NextRequest } from "next/server";
import { subError } from "@/utils/back/customError";
import { passwordValidator } from "@/utils/back/passwordValidator";
import { Student } from "@/models/student.model";
import { Teacher } from "@/models/teacher.model";
import bcrypt from "bcrypt";

export async function POST(request: NextRequest) {
    try {
        const user = await verifyJWT();
        await connectDB();

        const body = await request.json();
        const oldPassword = body?.oldPassword;
        const newPassword = body?.newPassword;

        if (
            !oldPassword ||
            !newPassword ||
            oldPassword === "" ||
            newPassword === ""
        ) {
            subError(400, "old and new password are required!");
        }
        if (newPassword.length < 8) {
            subError(
                400,
                "new password is too weak!, password must greater than 8 char!"
            );
        }
        const validPassword = await passwordValidator(
            user.password,
            oldPassword
        );
        if (!validPassword) {
            subError(401, "Unauthorized request!, password is not matched!");
        }

        const encryptedPassword = await bcrypt.hash(newPassword, 10);
        if (!encryptedPassword) {
            subError(500, "Something went wrong on password encryption!");
        }

        if (user.account === "STUDENT") {
            await Student.findByIdAndUpdate(
                user._id,
                {
                    $set: {
                        password: encryptedPassword,
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
                        password: encryptedPassword,
                    },
                },
                {
                    new: true,
                }
            );
        }
        return apiResponse(200, {}, "password changed successfully!");
    } catch (error: any) {
        return errorResponse(error.statusCode, error.message);
    }
}
