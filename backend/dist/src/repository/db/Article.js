"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("./db"));
const User_1 = __importDefault(require("./User"));
const sequelize = new sequelize_1.Sequelize({
    dialect: "mysql",
    host: db_1.default.config.host,
    username: db_1.default.config.user,
    password: db_1.default.config.password,
    database: db_1.default.config.database,
});
const Article = sequelize.define("Article", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    channel: {
        type: sequelize_1.DataTypes.STRING,
    },
    subject: {
        type: sequelize_1.DataTypes.STRING,
    },
    body: {
        type: sequelize_1.DataTypes.BLOB,
    },
});
Article.hasOne(User_1.default, { foreignKey: "id" });
sequelize
    .sync()
    .then(() => {
    console.log("Articles table created (if not exists)");
})
    .catch((error) => {
    console.error("Error syncing Article table:", error.message);
});
exports.default = Article;
