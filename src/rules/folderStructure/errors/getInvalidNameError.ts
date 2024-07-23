import { FinalError } from "../../../errors/FinalError";

export const getInvalidNameError = (name: unknown): FinalError =>
    new FinalError(
        `\n\n🔥 Property "name": ${JSON.stringify(
            name,
        )} is invalid. See documentation 'https://github.com/Igorkowalski94/eslint-plugin-project-structure/blob/main/documentation/project-structure-folder-structure.md#name'. 🔥\n\n`,
    );
