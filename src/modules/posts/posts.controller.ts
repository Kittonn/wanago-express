import { Router, Request, Response, NextFunction } from "express";
import postModel from "./models/post.model";
import { Controller } from "../../interfaces/controller.interface";
import PostNotFoundException from "../../exceptions/post-not-found.exception";
import { tryCatchFn } from "../../utils/try-catch.util";
import validationMiddleware from "../../middleware/validate.middleware";
import CreatePostDto from "./dto/create-post.dto";
import authMiddleware from "../../middleware/auth.middleware";

class PostsController implements Controller {
  public path = "/posts";
  public router = Router();
  private post = postModel;

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.get(this.path, this.getAllPosts);
    this.router.get(`${this.path}/:id`, this.getPostById);
    this.router.post(
      this.path,
      authMiddleware,
      validationMiddleware(CreatePostDto),
      this.createPost
    );
    this.router.patch(
      `${this.path}/:id`,
      authMiddleware,
      validationMiddleware(CreatePostDto, true),
      this.editPost
    );
    this.router.delete(`${this.path}/:id`, authMiddleware, this.deletePost);
  }

  private createPost = tryCatchFn(async (req: Request, res: Response) => {
    const postData = req.body;
    const author = req.user?._id;
    const createdPost = new this.post({ ...postData, author });
    const savedPost = await createdPost.save();

    return res.status(201).json(savedPost);
  });

  private getAllPosts = tryCatchFn(async (req: Request, res: Response) => {
    const posts = await this.post.find();
    return res.status(200).json(posts);
  });

  private getPostById = tryCatchFn(async (req: Request, res: Response) => {
    const id = req.params.id;
    const post = await this.post.findById(id);
    if (!post) {
      throw new PostNotFoundException(id);
    }
    return res.status(200).json(post);
  });

  private editPost = tryCatchFn(async (req: Request, res: Response) => {
    const id = req.params.id;
    const postData = req.body;

    const post = await this.post.findById(id);
    if (!post) {
      throw new PostNotFoundException(id);
    }

    const updatedPost = await this.post.findByIdAndUpdate(id, postData, {
      new: true,
    });
    return res.status(200).json(updatedPost);
  });

  private deletePost = tryCatchFn(async (req: Request, res: Response) => {
    const id = req.params.id;

    const post = await this.post.findById(id);
    if (!post) {
      throw new PostNotFoundException(id);
    }
    const deletedPost = await this.post.findByIdAndDelete(id);
    return res.status(200).json(deletedPost);
  });
}

export default PostsController;
