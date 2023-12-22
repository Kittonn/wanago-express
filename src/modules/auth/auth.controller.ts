import { Controller } from "interfaces/controller.interface";
import { Router } from "express";
import userModel from "modules/users/models/user.model";
import { tryCatchFn } from "../../utils/try-catch.util";

class AuthController implements Controller {
  public path = "/auth";
  public router = Router();
  private user = userModel;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    // this.router.post(`${this.path}/login`, this.login);
    // this.router.post(`${this.path}/register`, this.register);
  }

  private login = tryCatchFn(
    async (request: Request, response: Response) => {}
  );

  private register = tryCatchFn(
    async (request: Request, response: Response) => {}
  );
}
