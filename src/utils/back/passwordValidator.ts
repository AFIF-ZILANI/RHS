import bcrypt from "bcrypt";

export async function passwordValidator(hash: string, password: string) {
    return await bcrypt.compare(password, hash);
}
