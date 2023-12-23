import { Request, Response, Router } from "express";
import { Controller } from "interfaces/controller.interface";
import userModel from "../users/models/user.model";
import { tryCatchFn } from "../../utils/try-catch.util";

class ReportController implements Controller {
  public path = "/report";
  public router = Router();
  private user = userModel;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/users`, this.generateReport);
  }

  private generateReport = tryCatchFn(
    async (request: Request, response: Response) => {
      const usersByCountries = await this.user.aggregate([
        {
          $match: {
            "address.country": {
              $exists: true,
            },
          },
        },
        {
          $group: {
            _id: "$address._id",
            name: { $first: "$address.country" },
            users: {
              $push: {
                _id: "$_id",
                username: "$username",
              },
            },
            usersCount: { $sum: 1 },
          },
        },
        {
          $lookup: {
            from: "posts",
            localField: "users._id",
            foreignField: "author",
            as: "articles",
          },
        },
        {
          $addFields: {
            amountOfArticles: { $size: "$articles" },
          },
        },
        {
          $sort: { amountOfArticles: -1 },
        },
      ]);

      return response.status(200).json(usersByCountries);
    }
  );
}

export default ReportController;
