import { plainToClass } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { Request, NextFunction, Response, RequestHandler } from "express";
import HttpException from "../exceptions/http.exception";
import { tryCatchFn } from "../utils/try-catch.util";

function validationMiddleware<T>(
  type: any,
  skipMissingProperties = false
): RequestHandler {
  return tryCatchFn(
    async (request: Request, response: Response, next: NextFunction) => {
      const classInstance = plainToClass(type, request.body);
      const errors: ValidationError[] = await validate(classInstance, {
        skipMissingProperties,
      });

      if (errors.length > 0) {
        const message = errors
          .map((error: ValidationError) =>
            Object.values(error.constraints as Object)
          )
          .join(", ");
        next(new HttpException(400, message));
      } else {
        next();
      }
    }
  );
}

export default validationMiddleware;
