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
const express_1 = require("express");
const verifyJWT_1 = __importDefault(require("../token/verifyJWT"));
const axios_1 = __importDefault(require("axios"));
const config_json_1 = __importDefault(require("../../config.json"));
const pdf_parse_1 = __importDefault(require("pdf-parse"));
const articleServiceHistory_1 = __importDefault(require("../logic/articleServiceHistory"));
const getUserId_1 = __importDefault(require("../token/getUserId"));
const iqadotRouter = (0, express_1.Router)();
iqadotRouter.post("/getChannel", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    axios_1.default
        .get(`https://fs3-admin.iqadot.com/api/v3/admin/static/items/${req.body.channel}`, {
        headers: {
            Authorization: `${config_json_1.default["basic-auth"]}`,
        },
    })
        .then((response) => {
        console.log(response.data);
        res.status(200).json(response.data);
    })
        .catch((error) => {
        console.log(error);
        console.log(`There was an error contacting IQADOT: ${error.message}`);
    });
}));
iqadotRouter.post("/article", verifyJWT_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let id = 0;
    if (req.headers.authorization)
        id = (0, getUserId_1.default)(req.headers.authorization.replace("Bearer ", ""));
    let parsedPDF = undefined;
    if (req.files)
        if (req.files.pdf) {
            const pdfFile = req.files.pdf;
            const data = yield (0, pdf_parse_1.default)(pdfFile.data);
            parsedPDF = data.text.replace(/\r?\n/g, "<br>").substring(8);
        }
    const dataReq = {
        subject: JSON.parse(req.body.sub).subject,
        body: JSON.parse(req.body.sub).body,
        channel: JSON.parse(req.body.sub).channel,
    };
    try {
        // Convert data to JSON - this will depend on the structure of your PDF
        const jsonResult = {
            subject: dataReq.subject,
            body: "",
            channel: dataReq.channel,
        };
        if (parsedPDF && !dataReq.body) {
            console.log(1);
            jsonResult.body = parsedPDF;
        }
        else if (parsedPDF && dataReq.body) {
            console.log(2);
            jsonResult.body =
                dataReq.body +
                    "<br><br><br><div style='width: 100%; border:2px; border-color:black'></div>" +
                    parsedPDF;
        }
        else if (!parsedPDF && dataReq.body) {
            console.log(3);
            jsonResult.body = dataReq.body;
        }
        console.log(jsonResult);
        const iqadotres = axios_1.default.post("https://fs3-admin.iqadot.com/api/v3/admin/article/add", jsonResult, {
            headers: {
                Authorization: `${config_json_1.default["basic-auth"]}`,
            },
        });
        const res1 = yield iqadotres;
        const iqadotres2 = axios_1.default.get(`https://fs3-admin.iqadot.com/api/v3/admin/article/publish/${res1.data.data.item}`, {
            headers: {
                Authorization: `${config_json_1.default["basic-auth"]}`,
            },
        });
        const res2 = yield iqadotres2;
        let file = {};
        if (req.files)
            file = req.files.pdf;
        if (res2.data.data.result === "true") {
            articleServiceHistory_1.default.addArticle(jsonResult.subject, file, jsonResult.channel, id);
            res.status(200).json("success");
        }
        else
            res.status(400).json("error");
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Error processing PDF");
    }
}));
iqadotRouter.get("/channels", verifyJWT_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("channels");
    res.status(200).json({
        "Group Autumn 1": "ee3ee753-af36-f243-27f1-615ee58e4f5a",
        "Group Autumn 2": "d3ba02da-7aff-bcca-ab6b-97310dffb80a",
    });
}));
exports.default = iqadotRouter;
