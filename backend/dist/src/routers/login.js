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
const express_1 = require("express");
const userService_1 = __importDefault(require("../logic/userService"));
const signJWT_1 = __importDefault(require("../token/signJWT"));
const user_1 = require("../models/user");
const authRouter = (0, express_1.Router)();
authRouter.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const details = req.body;
    console.log(details);
    const authenticatedUser = yield userService_1.default.authenticateUser(details.email, details.password);
    if (authenticatedUser)
        res.status(202).json((0, signJWT_1.default)(authenticatedUser));
    else
        res.status(400).json({ message: "not logged in" });
}));
authRouter.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const details = req.body;
        if (yield userService_1.default.addUser(new user_1.User(details.email, details.password))) {
            res.status(202).json({ message: "Registered!" });
        }
        else
            res.status(400).json({ message: "Couldn't be registered!" });
    }
    catch (err) {
        res.status(400).json({ message: `Couldn't be registered: ${err}` });
    }
}));
exports.default = authRouter;
