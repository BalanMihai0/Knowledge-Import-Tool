"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_json_1 = __importDefault(require("../../config.json"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyJWT = (req, res, next) => {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (!token)
        return res.status(401).json({ error: "Authentication failed" });
    jsonwebtoken_1.default.verify(token, config_json_1.default.jwtSecret, (err, decoded) => {
        if (err)
            return res.status(401).json({ error: "Authentication failed" });
        req.user = decoded;
        next();
    });
};
exports.default = verifyJWT;
