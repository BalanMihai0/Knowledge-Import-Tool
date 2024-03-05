import express from "express";
import config from "../../config.json";
import jwt from "jsonwebtoken";

const verifyJWT = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ error: "Authentication failed" });

  jwt.verify(token, config.jwtSecret, (err, decoded) => {
    if (err) return res.status(401).json({ error: "Authentication failed" });
    req.user = decoded;
    next();
  });
};

export default verifyJWT;
