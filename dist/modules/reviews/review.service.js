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
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewService = void 0;
const show_model_1 = require("../tv-show/show.model");
const user_model_1 = require("../users/user.model");
const reviews_model_1 = require("./reviews.model");
const postReview = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const isUser = yield user_model_1.User.findById(data.user);
    if (!isUser) {
        return false;
    }
    const isShow = yield show_model_1.Show.findById(data.show);
    if (!isShow) {
        return false;
    }
    const review = yield reviews_model_1.Review.create(data);
    return review;
});
exports.reviewService = {
    postReview
};
