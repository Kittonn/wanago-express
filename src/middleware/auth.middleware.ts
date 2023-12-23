import { Request, Response, NextFunction } from "express";
import { tryCatchFn } from "../utils/try-catch.util";
import HttpException from "../exceptions/http.exception";
import userModel, { User } from "../modules/users/models/user.model";
import jwt from "jsonwebtoken";
import { env } from "../config/env.config";

const authMiddleware = tryCatchFn(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) throw new HttpException(401, "Unauthorized");

    const payload = jwt.verify(token, env.JWT_SECRET);

    const user = await userModel.findById(payload.sub).select("-password -__v");

    if (!user) throw new HttpException(401, "Unauthorized");

    req.user = user as User;

    next();
  }
);

export default authMiddleware;
