import { Student } from "@/models/student.model";
import { Teacher } from "@/models/teacher.model";
import { apiResponse, errorResponse } from "@/utils/back/customApiResonse";
import { connectDB } from "@/utils/back/dbConfig";
import { verifyJWT } from "@/utils/back/verifyUser";
import { cookies } from "next/headers";

export async function POST() {
    try {
        const user = await verifyJWT();
        await connectDB();

        if (user.account === "STUDENT") {
            await Student.findByIdAndUpdate(
                user._id,
                {
                    $set: {
                        refreshToken: "",
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
                        refreshToken: "",
                    },
                },
                {
                    new: true,
                }
            );
        }

        cookies().delete("refreshToken");
        cookies().delete("accessToken");
        return apiResponse(200, {}, "User Logged out successfully!");
    } catch (error: any) {
        return errorResponse(error.statusCode, error.message);
    }
}
