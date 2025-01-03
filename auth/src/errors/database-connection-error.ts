export class DatabaseConnectionError extends Error {
  reason = "Error connecting to Database";
  statusCode = 500;
  constructor() {
    super();
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }
  public serializeError() {
    return [{ message: this.reason }];
  }
}
