import { FinalError } from "../../../errors/FinalError/FinalError";

export const getInvalidIgnorePatternsError = (
    ignorePatterns: unknown,
): FinalError =>
    new FinalError(
        `\n\n🔥 Property "ignorePatterns": ${JSON.stringify(
            ignorePatterns,
        )} is invalid. See documentation 'https://github.com/Igorkowalski94/eslint-plugin-project-structure#ignore-patterns'. 🔥\n\n`,
    );
