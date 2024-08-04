import { FinalError } from "./FinalError";

export const finalErrorGuard = (err: unknown): err is FinalError =>
    !!((err as FinalError).type === "final");
