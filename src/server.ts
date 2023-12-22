import App from "./app";
import PostsController from "./modules/posts/posts.controller";
import { env } from "./config/env.config";

const port = env.PORT || 5000;

const app = new App([new PostsController()], port);

app.listen();
