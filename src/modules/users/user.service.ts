import { IUser } from "./user.interface";
import { User } from "./user.model";
import bcrypt from "bcryptjs";

const userRegister = async (data: IUser) => {
    const user = await User.create(data);
    return user;
}

 const userVerify = async (email: string, pass: string) => {
    const isUser = await User.findOne({ email });
    if(!isUser) {
        return false;
    }
    const isMatch = await bcrypt.compare(pass, isUser.password)
    if(!isMatch) {
        return false;
    }
    return isUser;
}

export const userService = {
    userRegister,
    userVerify
};
