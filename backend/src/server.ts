import express, { Request, Response } from "express";
import loginRouter from "./routers/auth";
import cors from "cors";
import verifyJWT from "./token/verifyJWT";
import getUserId from "./token/getUserId";
import UserService from "./logic/userService";
import iqadotRouter from "./routers/iqadot";
import fileUpload from "express-fileupload";
import articleRouter from "./routers/article";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());
app.use(fileUpload());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, Express!");
});

app.get("/home", verifyJWT, async (req: Request, res: Response) => {
  try {
    let id;
    if (req.headers.authorization) {
      id = getUserId(req.headers.authorization.replace("Bearer ", ""));
    }

    if (id) {
      const user = await UserService.getUser(id);

      if (user) {
        res.status(200).json(user);
      } else {
        res.status(400).json("User not found or something went wrong");
      }
    } else {
      res
        .status(400)
        .json("Invalid authorization header or something went wrong");
    }
  } catch (error) {
    res.status(500).json("Internal server error");
  }
});
app.use("/auth", loginRouter);
app.use("/iqadot", iqadotRouter);
app.use("/article", articleRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
