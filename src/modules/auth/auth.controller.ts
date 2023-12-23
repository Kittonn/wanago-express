import { Request, Response, Router } from "express";
import { Controller } from "../../interfaces/controller.interface";
import userModel from "../../modules/users/models/user.model";
import { tryCatchFn } from "../../utils/try-catch.util";
import LoginDto from "./dto/login.dto";
import RegisterDto from "./dto/register.dto";
import validationMiddleware from "../../middleware/validate.middleware";
import AuthService from "./auth.service";

class AuthController implements Controller {
  public path = "/auth";
  public router = Router();
  public authService = new AuthService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/login`,
      validationMiddleware(LoginDto),
      this.login
    );
    this.router.post(
      `${this.path}/register`,
      validationMiddleware(RegisterDto),
      this.register
    );
  }

  private login = tryCatchFn(async (request: Request, response: Response) => {
    const accessToken = await this.authService.login(request.body);

    return response.status(200).json({ accessToken });
  });

  private register = tryCatchFn(
    async (request: Request, response: Response) => {
      const accessToken = await this.authService.register(request.body);

      return response.status(200).json({ accessToken });
    }
  );
}

export default AuthController;
