"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mysql = require("mysql");
var connection = mysql.createConnection({
    host: 'studmysql01.fhict.local',
    user: 'dbi501909',
    password: 'paine234mamaliga',
    database: 'dbi501909'
});
connection.connect(function (err) {
    if (err) {
        console.error('Error connecting to database:', err.message);
        return;
    }
    console.log("Connected!");
});
exports.default = connection;
