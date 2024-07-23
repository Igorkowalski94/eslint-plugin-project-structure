import { FinalError } from "../../../errors/FinalError";

export const getInvalidRuleError = (rule: unknown): FinalError =>
    new FinalError(
        `\n\n🔥 Rule: ${JSON.stringify(
            rule,
        )} is invalid. See documentation 'https://github.com/Igorkowalski94/eslint-plugin-project-structure/blob/main/documentation/project-structure-folder-structure.md#api'. 🔥\n\n`,
    );
