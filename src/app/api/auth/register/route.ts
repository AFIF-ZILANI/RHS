import { Student } from "@/models/student.model";
import { Teacher } from "@/models/teacher.model";
import { apiResponse, errorResponse } from "@/utils/back/customApiResonse";
import { subError } from "@/utils/back/customError";
import { connectDB } from "@/utils/back/dbConfig";
import { emailValidator } from "@/utils/back/emailValidator";
import { gart } from "@/utils/back/gart";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    try {
        await connectDB();

        const body = await request.json();
        const email = body?.email;
        const username = body?.username;
        const fullName = body?.fullName;
        const password = body?.password;
        const phone = body?.phone;
        const account_type = body?.account_type;

        if (
            email === "" ||
            !email ||
            username === null ||
            !username ||
            fullName === "" ||
            !fullName ||
            password === "" ||
            !password ||
            phone === "" ||
            !phone ||
            account_type === "" ||
            !account_type
        ) {
            subError(400, "all filelds are required!");
        }

        if (account_type !== "STUDENT" && account_type !== "TEACHER") {
            subError(400, "account type is not valid!");
        }

        if (!emailValidator(email)) {
            subError(400, "Email must be right format!");
        }

        const existedUsernameStudent = await Student.findOne({ username });
        if (existedUsernameStudent) {
            subError(400, "The username is already used in a student account");
        }

        const existedEmailStudent = await Student.findOne({ email });
        if (existedEmailStudent) {
            subError(400, "The email is already used in a student account");
        }

        const existedPhoneStudent = await Student.findOne({ phone });
        if (existedPhoneStudent) {
            subError(
                400,
                "The phone number is already used in a student account"
            );
        }
        const existedUsernameTeacher = await Teacher.findOne({ username });
        if (existedUsernameTeacher) {
            subError(400, "The username is already used in a teacher account");
        }
        const existedEmailTeacher = await Teacher.findOne({ email });
        if (existedEmailTeacher) {
            subError(400, "The email is already used in a teacher account");
        }

        const existedPhoneTeacher = await Teacher.findOne({ email });
        if (existedPhoneTeacher) {
            subError(
                400,
                "The phone number is already used in a teacher account"
            );
        }

        if (account_type === "STUDENT") {
            const student = await Student.create({
                email,
                username,
                fullName,
                password,
                phone,
                account: account_type,
            });
            await gart(student._id, "STUDENT", "both");

            const createdStudent = await Student.findById(student._id).select(
                "-password -refreshToken"
            );

            if (!createdStudent) {
                subError(
                    500,
                    "Something went wrong to create student's accout!"
                );
            }

            return apiResponse(
                200,
                createdStudent,
                "student's account is created successfully!"
            );
        }

        if (account_type === "TEACHER") {
            const teacher = await Teacher.create({
                email,
                username,
                fullName,
                password,
                phone,
                account: account_type,
            });

            await gart(teacher._id, "TEACHER", "both");
            const createdTeacher = await Teacher.findById(teacher._id).select(
                "-password -refreshToken"
            );
            if (!createdTeacher) {
                subError(
                    500,
                    "something went wrong to create teacher's account!"
                );
            }

            return apiResponse(
                200,
                createdTeacher,
                "teacher's account is created successfully!"
            );
        }
    } catch (error: any) {
        return errorResponse(error.statusCode, error.message);
    }
}
