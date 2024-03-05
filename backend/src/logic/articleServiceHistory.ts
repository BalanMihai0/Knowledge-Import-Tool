import { UploadedFile } from "express-fileupload";
import Article, { ArticleModel } from "../repository/db/Article";

class ArticleServiceHistory {
  static addArticle = async (
    subject: string,
    body: UploadedFile,
    channel: string,
    authorID: number
  ): Promise<boolean> => {
    try {
      const article = await Article.create({
        subject: subject,
        body: body,
        channel: channel,
        userId: authorID,
      });

      console.log("Article added:", article.toJSON());
      return true;
    } catch (error: any) {
      console.error("Error adding article:", error.message);
      return false;
    }
  };

  static getAllArticles = async (): Promise<ArticleModel[] | null> => {
    try {
      const articles = (await Article.findAll<ArticleModel>()) as
        | ArticleModel[]
        | null;
      return articles || null;
    } catch (error: any) {
      console.error("Error getting articles:", error.message);
      return null;
    }
  };
}
export default ArticleServiceHistory;
