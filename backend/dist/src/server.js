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
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("./routers/auth"));
const cors_1 = __importDefault(require("cors"));
const verifyJWT_1 = __importDefault(require("./token/verifyJWT"));
const getUserId_1 = __importDefault(require("./token/getUserId"));
const userService_1 = __importDefault(require("./logic/userService"));
const iqadot_1 = __importDefault(require("./routers/iqadot"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const article_1 = __importDefault(require("./routers/article"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((0, express_fileupload_1.default)());
app.get("/", (req, res) => {
    res.send("Hello, Express!");
});
app.get("/home", verifyJWT_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let id;
        if (req.headers.authorization) {
            id = (0, getUserId_1.default)(req.headers.authorization.replace("Bearer ", ""));
        }
        if (id) {
            const user = yield userService_1.default.getUser(id);
            if (user) {
                res.status(200).json(user);
            }
            else {
                res.status(400).json("User not found or something went wrong");
            }
        }
        else {
            res
                .status(400)
                .json("Invalid authorization header or something went wrong");
        }
    }
    catch (error) {
        res.status(500).json("Internal server error");
    }
}));
app.use("/auth", auth_1.default);
app.use("/iqadot", iqadot_1.default);
app.use("/article", article_1.default);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
