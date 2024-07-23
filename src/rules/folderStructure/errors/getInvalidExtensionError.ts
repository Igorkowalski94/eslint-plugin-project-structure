import { FinalError } from "../../../errors/FinalError";

export const getInvalidExtensionError = (extension: unknown): FinalError =>
    new FinalError(
        `\n\n🔥 Property "extension": ${JSON.stringify(
            extension,
        )} is invalid. See documentation 'https://github.com/Igorkowalski94/eslint-plugin-project-structure/blob/main/documentation/project-structure-folder-structure.md#extension' 🔥\n\n`,
    );
