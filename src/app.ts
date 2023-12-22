import express, { Application } from "express";
import bodyParser from "body-parser";
import { Controller } from "interfaces/controller.interface";
import connectDB from "./database/connect";
import errorMiddleware from "./middleware/error.middleware";

class App {
  public app: Application;
  public port: number;

  constructor(controllers: Controller[], port: number) {
    this.app = express();
    this.port = port;

    this.initializeDatabase();
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    this.initializeErrorHandling();
  }

  private initializeMiddlewares() {
    this.app.use(bodyParser.json());
  }

  private initializeControllers(controllers: Controller[]) {
    controllers.forEach((controller: Controller) => {
      this.app.use("/", controller.router);
    });
  }

  private initializeDatabase() {
    connectDB();
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`⚡ Server running on port ${this.port}`);
    });
  }
}

export default App;
