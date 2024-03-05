import { Model, Optional } from "sequelize";
import { UploadedFile } from "express-fileupload";
type ArticleType = {
    id: number;
    subject: string;
    body: UploadedFile;
    channel: string;
    userId: number;
};
interface ArticleCreationAttributes extends Optional<ArticleType, "id"> {
}
export type ArticleModel = Model<ArticleType, ArticleCreationAttributes>;
declare const Article: import("sequelize").ModelCtor<ArticleModel>;
export default Article;
