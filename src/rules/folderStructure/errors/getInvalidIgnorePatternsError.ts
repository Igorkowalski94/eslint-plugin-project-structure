import { FinalError } from "../../../errors/FinalError";

export const getInvalidIgnorePatternsError = (
    ignorePatterns: unknown,
): FinalError =>
    new FinalError(
        `\n\n🔥 Property "ignorePatterns": ${JSON.stringify(
            ignorePatterns,
        )} is invalid. See documentation 'https://github.com/Igorkowalski94/eslint-plugin-project-structure/blob/main/documentation/project-structure-folder-structure.md#ignore-patterns'. 🔥\n\n`,
    );
