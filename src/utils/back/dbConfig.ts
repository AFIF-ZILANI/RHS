import mongoose from "mongoose";
import { subError } from "./customError";

export async function connectDB() {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/RHS`);
        console.log(`MONGODB connected successfully! \n DB Host: ${connectionInstance.connection.host}`)
    } catch (error: any) {
        console.log("MongoDB connction Error!", error.message);
        subError(500, error.message);
    }
}
