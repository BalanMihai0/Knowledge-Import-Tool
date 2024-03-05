"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("./db"));
const sequelize = new sequelize_1.Sequelize({
    dialect: 'mysql',
    host: db_1.default.config.host,
    username: db_1.default.config.user,
    password: db_1.default.config.password,
    database: db_1.default.config.database,
});
const User = sequelize.define('User', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
});
sequelize.sync()
    .then(() => {
    console.log('User table created (if not exists)');
})
    .catch((error) => {
    console.error('Error syncing User table:', error.message);
});
exports.default = User;
