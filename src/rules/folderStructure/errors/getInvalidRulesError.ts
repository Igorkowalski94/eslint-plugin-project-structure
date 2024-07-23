import { FinalError } from "../../../errors/FinalError";

export const getInvalidRulesError = (): FinalError =>
    new FinalError(
        `\n\n🔥 Property "rules" is invalid. See documentation 'https://github.com/Igorkowalski94/eslint-plugin-project-structure/blob/main/documentation/project-structure-folder-structure.md#rules'. 🔥\n\n`,
    );
