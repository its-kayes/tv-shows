import { IUser } from "./user.interface";
import { User } from "./user.model";

const userRegister = async (data: IUser) => {
    const user = await User.create(data);
    return user;
}

export const userService = {
    userRegister
};
