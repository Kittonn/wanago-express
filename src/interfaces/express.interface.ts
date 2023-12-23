import express from "express";
import { User } from "../modules/users/models/user.model";

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}
