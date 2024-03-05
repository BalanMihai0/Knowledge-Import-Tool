import { Model, Optional } from "sequelize";
type ArticleType = {
    id: number;
    subject: string;
    body: string;
    channel: string;
};
declare const Article: import("sequelize").ModelCtor<Model<any, any>>;
interface ArticleCreationAttributes extends Optional<ArticleType, "id"> {
}
export type ArticleModel = Model<ArticleCreationAttributes, ArticleCreationAttributes>;
export default Article;
