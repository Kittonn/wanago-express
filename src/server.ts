import App from "./app";
import { env } from "./config/env.config";
import AuthController from "./modules/auth/auth.controller";
import PostsController from "./modules/posts/posts.controller";
import UsersController from "./modules/users/users.controller";
import ReportController from "./modules/report/report.controller";

const port = env.PORT || 5000;

const app = new App(
  [
    new PostsController(),
    new AuthController(),
    new UsersController(),
    new ReportController(),
  ],
  port
);

app.listen();
