import express from "express";
declare const verifyJWT: (req: express.Request, res: express.Response, next: express.NextFunction) => express.Response<any, Record<string, any>> | undefined;
export default verifyJWT;
