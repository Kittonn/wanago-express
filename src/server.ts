import App from "./app";
import PostsController from "./modules/posts/posts.controller";
import { env } from "./config/env.config";
import AuthController from "./modules/auth/auth.controller";

const port = env.PORT || 5000;

const app = new App([new PostsController(), new AuthController()], port);

app.listen();
