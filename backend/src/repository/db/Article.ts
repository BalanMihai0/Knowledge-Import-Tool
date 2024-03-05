import { Sequelize, DataTypes, Model, Optional } from "sequelize";
import connection from "./db";
import User from "./User";
import { UploadedFile } from "express-fileupload";

const sequelize = new Sequelize({
  dialect: "mysql",
  host: connection.config.host,
  username: connection.config.user,
  password: connection.config.password,
  database: connection.config.database,
});

type ArticleType = {
  id: number;
  subject: string;
  body: UploadedFile;
  channel: string;
  userId: number;
};

interface ArticleCreationAttributes extends Optional<ArticleType, "id"> {}

export type ArticleModel = Model<ArticleType, ArticleCreationAttributes>;

const Article = sequelize.define<ArticleModel>("Article", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
  },
  channel: {
    type: DataTypes.STRING,
  },
  subject: {
    type: DataTypes.STRING,
  },
  body: {
    type: DataTypes.BLOB,
  },
});

Article.hasOne(User, { foreignKey: "id" });

sequelize
  .sync()
  .then(() => {
    console.log("Articles table created (if not exists)");
  })
  .catch((error: any) => {
    console.error("Error syncing Article table:", error.message);
  });

export default Article;
