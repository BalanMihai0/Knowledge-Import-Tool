"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const getUserId = (token) => {
    const payload = jsonwebtoken_1.default.decode(token);
    if (payload)
        return payload.id;
    else
        return 0;
};
exports.default = getUserId;
