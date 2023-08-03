import { FinalError } from "../../../errors/FinalError/FinalError";

export const getInvalidNameError = (name: unknown): FinalError =>
    new FinalError(
        `\n\n🔥 Property "name": '${name}' is invalid. See documentation 'https://github.com/Igorkowalski94/eslint-plugin-project-structure#name'. 🔥\n\n`,
    );
