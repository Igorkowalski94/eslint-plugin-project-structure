export class FinalValidationError extends Error {
  message: string;
  type: string;

  constructor(message: string) {
    super(message);

    this.message = message;
    this.type = "final";
  }
}
