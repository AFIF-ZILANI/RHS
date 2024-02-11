import mongoose from "mongoose";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";

const teacherSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            unique: true,
            required: true,
        },
        username: {
            type: Number,
            unique: true,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        fullName: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
            unique: true,
        },
        refreshToken: {
            type: String,
        },
        account: {
            type: String,
            required: true,
            enum: ["STUDENT", "TEACHER"],
        },
    },
    { timestamps: true }
);

teacherSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
        next();
    }
    next();
});

teacherSchema.methods.genrateAccessToken = function () {
    return Jwt.sign(
        {
            _id: this._id,
            username: this.username,
            email: this.email,
            fullName: this.fullName,
        },
        `${process.env.ACCESS_TOKEN_SECRET}`,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        }
    );
};
teacherSchema.methods.genrateRefreshToken = function () {
    return Jwt.sign(
        {
            _id: this._id,
        },
        `${process.env.REFRESH_TOKEN_SECRET}`,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
        }
    );
};

export const Teacher =
    mongoose.models.Teacher || mongoose.model("Teacher", teacherSchema);
