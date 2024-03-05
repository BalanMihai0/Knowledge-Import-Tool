import { Router, Request, Response } from "express";
import verifyJWT from "../token/verifyJWT";
import axios from "axios";
import config from "../../config.json";
import fileUpload, { UploadedFile } from "express-fileupload";
import pdfParse from "pdf-parse";
import ArticleServiceHistory from "../logic/articleServiceHistory";
import getUserId from "../token/getUserId";

const iqadotRouter = Router();

iqadotRouter.post("/getChannel", async (req: Request, res: Response) => {
  axios
    .get(
      `https://fs3-admin.iqadot.com/api/v3/admin/static/items/${req.body.channel}`,
      {
        headers: {
          Authorization: `${config["basic-auth"]}`,
        },
      }
    )
    .then((response) => {
      console.log(response.data);
      res.status(200).json(response.data);
    })
    .catch((error) => {
      console.log(error);
      console.log(`There was an error contacting IQADOT: ${error.message}`);
    });
});

iqadotRouter.post(
  "/article",
  verifyJWT,
  async (req: Request, res: Response) => {
    let id: number = 0;
    if (req.headers.authorization)
      id = getUserId(req.headers.authorization.replace("Bearer ", ""));
    type jsonReq = {
      subject: string;
      body?: string;
      channel: string;
    };

    let parsedPDF: string | undefined = undefined;

    if (req.files)
      if (req.files.pdf) {
        const pdfFile = req.files.pdf as fileUpload.UploadedFile;
        const data = await pdfParse(pdfFile.data);
        parsedPDF = data.text.replace(/\r?\n/g, "<br>").substring(8);
      }

    const dataReq = {
      subject: JSON.parse(req.body.sub).subject,
      body: JSON.parse(req.body.sub).body,
      channel: JSON.parse(req.body.sub).channel,
    } as jsonReq;

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
      } else if (parsedPDF && dataReq.body) {
        console.log(2);
        jsonResult.body =
          dataReq.body +
          "<br><br><br><div style='width: 100%; border:2px; border-color:black'></div>" +
          parsedPDF;
      } else if (!parsedPDF && dataReq.body) {
        console.log(3);
        jsonResult.body = dataReq.body;
      }
      console.log(jsonResult);
      const iqadotres = axios.post(
        "https://fs3-admin.iqadot.com/api/v3/admin/article/add",
        jsonResult,
        {
          headers: {
            Authorization: `${config["basic-auth"]}`,
          },
        }
      );
      const res1 = await iqadotres;
      const iqadotres2 = axios.get(
        `https://fs3-admin.iqadot.com/api/v3/admin/article/publish/${res1.data.data.item}`,
        {
          headers: {
            Authorization: `${config["basic-auth"]}`,
          },
        }
      );
      const res2 = await iqadotres2;
      let file: UploadedFile = {} as UploadedFile;
      if (req.files) file = req.files.pdf as UploadedFile;
      if (res2.data.data.result === "true") {
        ArticleServiceHistory.addArticle(
          jsonResult.subject,
          file,
          jsonResult.channel,
          id
        );
        res.status(200).json("success");
      } else res.status(400).json("error");
    } catch (error) {
      console.log(error);
      res.status(500).send("Error processing PDF");
    }
  }
);

iqadotRouter.get(
  "/channels",
  verifyJWT,
  async (req: Request, res: Response) => {
    console.log("channels");
    res.status(200).json({
      "Group Autumn 1": "ee3ee753-af36-f243-27f1-615ee58e4f5a",
      "Group Autumn 2": "d3ba02da-7aff-bcca-ab6b-97310dffb80a",
    });
  }
);

export default iqadotRouter;
