import { CustomError } from "./custom-error";
export class NotFoundError extends CustomError {
  statusCode: number = 404;
  constructor() {
    super("Route not found");
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
  public serializeErrors() {
    return [{ message: "Not Found" }];
  }
}
