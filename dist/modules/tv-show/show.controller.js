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
exports.showControllers = void 0;
const catchAsync_1 = __importDefault(require("../../util/catchAsync"));
const show_model_1 = require("./show.model");
const show_service_1 = require("./show.service");
const AppError_1 = __importDefault(require("../../util/AppError"));
// Create a show [Only for admin]
const createShow = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const show = yield show_model_1.Show.create(req.body);
    res.status(200).json({
        status: "success",
        show
    });
}));
// Get all shows with pagination and sorting
const getShow = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit = 10, page, sortBy, sortOrder, } = req.query;
    const skip = (Number(page) - 1) * Number(limit) || 0;
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder === 'asc' ? 1 : -1;
    }
    const result = yield show_service_1.ShowService.getShow(Number(limit), skip, sortConditions);
    res.status(200).json({
        status: "success",
        result
    });
}));
// Get show by title
const getShowByTitle = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { title } = req.query;
    if (!title) {
        next(new AppError_1.default("Please provide a title", 400));
    }
    const show = yield show_model_1.Show.findOne({ title });
    res.status(200).json({
        status: "success",
        show
    });
}));
exports.showControllers = {
    createShow,
    getShow,
    getShowByTitle
};
