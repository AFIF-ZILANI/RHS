import { Student } from "@/models/student.model";
import { Teacher } from "@/models/teacher.model";
import { apiResponse, errorResponse } from "@/utils/back/customApiResonse";
import { subError } from "@/utils/back/customError";
import { connectDB } from "@/utils/back/dbConfig";
import { gart } from "@/utils/back/gart";
import { passwordValidator } from "@/utils/back/passwordValidator";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    try {
        await connectDB();
        const body = await request.json();
        const username = body?.username;
        const password = body?.password;
        if (username === "" || !username || password === "" || !password) {
            subError(400, "all fields are required!");
        }

        const student = await Student.findOne({ username });
        if (student) {
            const validatedPassword = await passwordValidator(
                student.password,
                password
            );
            if (!validatedPassword) {
                subError(400, "password is not valid!");
            }

            const accessToken = await gart(
                student._id,
                "STUDENT",
                "accessToken"
            );

            const loggedInStudent = await Student.findById(student._id).select(
                "-password -refreshToken"
            );
            cookies().set("accessToken", accessToken, {
                httpOnly: true,
                // secure: true,
            });
            cookies().set("refreshToken", student.refreshToken, {
                httpOnly: true,
                // secure: true,
            });

            return apiResponse(
                200,
                {
                    user: loggedInStudent,
                    accessToken,
                    refreshToken: student.refreshToken,
                },
                "Logged in student successfully!"
            );
        }

        const teacher = await Teacher.findOne({ username });
        if (teacher) {
            const validatedPassword = await passwordValidator(
                teacher.password,
                password
            );
            if (!validatedPassword) {
                subError(400, "password is not valid!");
            }

            const accessToken = await gart(
                teacher._id,
                "teacher",
                "accessToken"
            );

            const loggedInTeacher = await Teacher.findById(teacher._id).select(
                "-password -refreshToken"
            );

            cookies().set("accessToken", accessToken, {
                httpOnly: true,
                // secure: true,
            });
            cookies().set("refreshToken", teacher.refreshToken, {
                httpOnly: true,
                // secure: true,
            });

            return apiResponse(
                200,
                {
                    user: loggedInTeacher,
                    accessToken,
                    refreshToken: teacher.refreshToken,
                },
                "Logged in teacher successfully!"
            );
        }

        if (!student && !teacher) {
            subError(404, "User does not existed!");
        }
    } catch (error: any) {
        return errorResponse(error.statusCode, error.message);
    }
}
