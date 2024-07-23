export class FinalError extends Error {
    message: string;
    type: string;

    constructor(message: string) {
        super(message);

        this.message = message;
        this.type = "final";
    }
}
