import { FinalError } from "../../../errors/FinalError/FinalError";

export const getInvalidTypeError = (type: unknown): FinalError =>
    new FinalError(
        `\n\n🔥 Property "type": '${type}' is invalid. See documentation 'https://github.com/Igorkowalski94/eslint-plugin-project-structure#type'. 🔥\n\n`,
    );
