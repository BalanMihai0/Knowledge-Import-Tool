"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userService_1 = __importDefault(require("../logic/userService"));
const signJWT_1 = __importDefault(require("../token/signJWT"));
const user_1 = require("../models/user");
const loginRouter = (0, express_1.Router)();
loginRouter.post("/", (req, res) => {
    const details = req.body;
    console.log(details);
    const authenticatedUser = userService_1.default.authenticateUser(details.email, details.password);
    if (authenticatedUser)
        res.status(202).json({ data: (0, signJWT_1.default)(authenticatedUser) });
    res.status(400).json({ message: "not logged in" });
    return;
});
loginRouter.post("/register", (req, res) => {
    const details = req.body;
    if (userService_1.default.addUser(new user_1.User(details.email, details.password))) {
        res.status(202).json({ message: "Registered!" });
    }
    else
        res.status(400).json({ message: "Couldn't be registered!" });
});
exports.default = loginRouter;
