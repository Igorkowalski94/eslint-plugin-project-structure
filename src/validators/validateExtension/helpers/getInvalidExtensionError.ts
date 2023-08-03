import { FinalError } from "../../../errors/FinalError/FinalError";

export const getInvalidExtensionError = (extension: unknown): FinalError =>
    new FinalError(
        `\n\n🔥 Property "extension": '${extension}' is invalid. See documentation 'https://github.com/Igorkowalski94/eslint-plugin-project-structure#extension' 🔥\n\n`,
    );
