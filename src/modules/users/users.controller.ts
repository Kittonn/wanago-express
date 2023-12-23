import { Controller } from "../../interfaces/controller.interface";
import { Request, Response, Router } from "express";
import authMiddleware from "../../middleware/auth.middleware";

class UsersController implements Controller {
  public path = "/users";
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/me`, authMiddleware, this.getProfile);
  }

  private getProfile = async (request: Request, response: Response) => {
    return response.status(200).json(request.user);
  };
}

export default UsersController;
