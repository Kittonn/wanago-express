import { Controller } from "../../interfaces/controller.interface";
import { Request, Response, Router } from "express";
import authMiddleware from "../../middleware/auth.middleware";
import { tryCatchFn } from "../../utils/try-catch.util";
import postModel from "../../modules/posts/models/post.model";
import userModel from "./models/user.model";

class UsersController implements Controller {
  public path = "/users";
  public router = Router();
  private user = userModel;
  private post = postModel;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/me`, authMiddleware, this.getProfile);
    this.router.get(`${this.path}/me/posts`, authMiddleware, this.getUserPosts);
  }

  private getProfile = tryCatchFn(
    async (request: Request, response: Response) => {
      return response.status(200).json(request.user);
    }
  );

  private getUserPosts = tryCatchFn(
    async (request: Request, response: Response) => {
      const posts = await this.post.find({ author: request.user?._id });
      return response.status(200).json(posts);
    }
  );
}

export default UsersController;
