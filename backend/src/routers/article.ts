import { Router, Request, Response } from "express";
import ArticleServiceHistory from "../logic/articleServiceHistory";

const articleRouter = Router();

articleRouter.get("/", async (req: Request, res: Response) => {
  ArticleServiceHistory.getAllArticles().then((articles) => {
    if (articles) {
      res.status(200).json(articles);
    } else {
      res.status(400).json("Something went wrong");
    }
  });
});

export default articleRouter;
