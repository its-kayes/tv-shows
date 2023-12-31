"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const user_model_1 = require("./user.model");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userRegister = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.create(data);
    return user;
});
const userVerify = (email, pass) => __awaiter(void 0, void 0, void 0, function* () {
    const isUser = yield user_model_1.User.findOne({ email });
    if (!isUser) {
        return false;
    }
    const isMatch = yield bcryptjs_1.default.compare(pass, isUser.password);
    if (!isMatch) {
        return false;
    }
    return isUser;
});
exports.userService = {
    userRegister,
    userVerify
};
