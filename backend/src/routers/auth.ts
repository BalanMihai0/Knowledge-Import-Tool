import { Router, Request, Response } from "express";
import loginDTO from "../models/loginDTO";
import userService from "../logic/userService";
import signJWT from "../token/signJWT";
import User, { UserModel } from "../repository/db/User";
import verifyJWT from "../token/verifyJWT";
const authRouter = Router();

authRouter.post("/login", async (req: Request, res: Response) => {
  const details: loginDTO = req.body;
  console.log(details);
  const authenticatedUser = await userService.authenticateUser(
    details.email,
    details.password
  );
  if (authenticatedUser) res.status(202).json(await signJWT((authenticatedUser.dataValues.id)));
    else res.status(400).json({ message: "not logged in" });
});

authRouter.post("/register", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as loginDTO;
    if (await userService.addUser(email, password)) {
      res.status(202).json({ message: "Registered!" });
    } else {
      res.status(400).json({ message: "Couldn't be registered!" });
    }
  } catch (err) {
    res.status(400).json({ message: `Couldn't be registered: ${err}` });
  }
});

authRouter.get("/users", verifyJWT, async (req: Request, res: Response) => { 
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  }
  catch (err) {
    res.status(400).json({ message: `Couldn't find users: ${err}` });
  }
});

export default authRouter;
