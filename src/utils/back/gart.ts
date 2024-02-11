import { Student } from "@/models/student.model";
import { subError } from "./customError";
import { Teacher } from "@/models/teacher.model";

export async function gart(userId: string, user_type: string, type: string) {
    try {
        if (user_type !== "STUDENT" && user_type !== "TEACHER") {
            subError(
                500,
                "'STUDENT' and 'TEACHER' type is only available for the value of user_type in gart function"
            );
        }
        if (type === "accessToken") {
            if (user_type === "STUDENT") {
                const user = await Student.findById(userId);

                return await user.genrateAccessToken();
            }

            if (user_type === "TEACHER") {
                const user = await Teacher.findById(userId);

                return await user.genrateAccessToken();
            }
        }

        if (type === "refreshToken") {
            if (user_type === "STUDENT") {
                const user = await Student.findById(userId);

                const refreshToken = await user.genrateRefreshToken();

                user.refreshToken = refreshToken;
                await user.save({ validateBeforeSave: false });

                return refreshToken;
            }

            if (user_type === "TEACHER") {
                const user = await Teacher.findById(userId);

                const refreshToken = await user.genrateRefreshToken();

                user.refreshToken = refreshToken;
                await user.save({ validateBeforeSave: false });

                return refreshToken;
            }
        }

        if (type === "both") {
            if (user_type === "STUDENT") {
                const user = await Student.findById(userId);

                const accessToken = await user.genrateAccessToken();
                const refreshToken = await user.genrateRefreshToken();

                user.refreshToken = refreshToken;
                await user.save({ validateBeforeSave: false });

                return { accessToken, refreshToken };
            }

            if (user_type === "TEACHER") {
                const user = await Teacher.findById(userId);

                const accessToken = await user.genrateAccessToken();
                const refreshToken = await user.genrateRefreshToken();

                user.refreshToken = refreshToken;
                await user.save({ validateBeforeSave: false });

                return { accessToken, refreshToken };
            }
        }
    } catch (error: any) {
        subError(
            500,
            "Something went wrong while generating the access token!"
        );
    }
}
