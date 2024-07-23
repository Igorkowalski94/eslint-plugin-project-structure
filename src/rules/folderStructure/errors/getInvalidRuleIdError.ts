import { FinalError } from "../../../errors/FinalError";

export const getInvalidRuleIdError = (ruleId: unknown): FinalError =>
    new FinalError(
        `\n\n🔥 Property "ruleId": ${JSON.stringify(
            ruleId,
        )} is invalid. See documentation 'https://github.com/Igorkowalski94/eslint-plugin-project-structure/blob/main/documentation/project-structure-folder-structure.md#ruleid'. 🔥\n\n`,
    );
