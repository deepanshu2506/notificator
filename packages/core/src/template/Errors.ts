export class HandleBarsPropertiesError extends Error {
  constructor(message: string | undefined) {
    super(message);
    this.name = "HandleBarsPropertiesError";
  }
}
