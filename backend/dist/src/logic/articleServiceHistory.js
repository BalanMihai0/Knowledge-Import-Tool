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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const Article_1 = __importDefault(require("../repository/db/Article"));
class ArticleServiceHistory {
}
_a = ArticleServiceHistory;
ArticleServiceHistory.addArticle = (subject, body, channel, authorID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const article = yield Article_1.default.create({
            subject: subject,
            body: body,
            channel: channel,
            userId: authorID,
        });
        console.log("Article added:", article.toJSON());
        return true;
    }
    catch (error) {
        console.error("Error adding article:", error.message);
        return false;
    }
});
ArticleServiceHistory.getAllArticles = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const articles = (yield Article_1.default.findAll());
        return articles || null;
    }
    catch (error) {
        console.error("Error getting articles:", error.message);
        return null;
    }
});
exports.default = ArticleServiceHistory;
