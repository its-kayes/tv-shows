"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'Name is required !'],
        maxlength: [50, 'Name must be less than 50 characters !']
    },
    email: {
        type: String,
        required: [true, 'Email is required !'],
        unique: true,
        maxlength: [50, 'Email must be less than 50 characters !']
    },
    password: {
        type: String,
        required: [true, 'Password is required !!'],
        minlength: [3, 'Password must be greater than 3 characters !'],
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
        required: [true, 'Role is required !'],
    }
}, { timestamps: true });
exports.User = (0, mongoose_1.model)('User', userSchema);
