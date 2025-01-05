import { CustomError } from "./custom-error";

export class DatabaseConnectionError extends CustomError {
  reason: string = "Error connecting to Database";
  statusCode: number = 500;
  constructor() {
    super("Error connection to DB");
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }
  public serializeErrors() {
    return [{ message: this.reason }];
  }
}
