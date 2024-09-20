export class FinalError extends Error {
  message: string;
  type: string;

  // eslint-disable-next-line project-structure/file-composition
  constructor(message: string) {
    super(message);

    this.message = message;
    this.type = "final";
  }
}
