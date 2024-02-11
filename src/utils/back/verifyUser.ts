import { cookies, headers } from "next/headers";
import { subError } from "./customError";
import Jwt from "jsonwebtoken";
import { Student } from "@/models/student.model";
import { Teacher } from "@/models/teacher.model";

export async function verifyJWT() {
    try {
        const accFormCookies = cookies().get("accessToken")?.value;
        const accFromHeaders = headers().get("Authorization");
        const accessToken = accFormCookies || accFromHeaders;
        if (!accessToken) {
            subError(401, "Unauthorized request!");
        }
        const decodedData: any = Jwt.verify(
            accessToken!,
            process.env.ACCESS_TOKEN_SECRET!
        );
        if (!decodedData) {
            subError(500, "Something went wrong on decoding the Access Token!");
        }
        const student = await Student.findById(decodedData._id);
        const teacher = await Teacher.findById(decodedData._id);
        const user = student || teacher;
        if (!user) {
            subError(401, "Invalid Access Token!");
        }
        return user;
    } catch (error: any) {
        subError(401, error.message || "Access Token is not valid!");
    }
}
