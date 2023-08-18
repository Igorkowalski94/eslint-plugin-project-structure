import { FinalError } from "../../../errors/FinalError/FinalError";

export const getInvalidExtensionError = (extension: unknown): FinalError =>
    new FinalError(
        `\n\n🔥 Property "extension": ${JSON.stringify(
            extension,
        )} is invalid. See documentation 'https://github.com/Igorkowalski94/eslint-plugin-project-structure#extension' 🔥\n\n`,
    );
