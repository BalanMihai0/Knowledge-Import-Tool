import { UploadedFile } from "express-fileupload";
import { ArticleModel } from "../repository/db/Article";
declare class ArticleServiceHistory {
    static addArticle: (subject: string, body: UploadedFile, channel: string, authorID: number) => Promise<boolean>;
    static getAllArticles: () => Promise<ArticleModel[] | null>;
}
export default ArticleServiceHistory;
