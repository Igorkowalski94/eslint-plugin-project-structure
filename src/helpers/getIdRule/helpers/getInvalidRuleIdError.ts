import { FinalError } from "../../../errors/FinalError/FinalError";

export const getInvalidRuleIdError = (ruleId: unknown): FinalError =>
    new FinalError(
        `\n\n🔥 Property "ruleId": ${JSON.stringify(
            ruleId,
        )} is invalid. See documentation 'https://github.com/Igorkowalski94/eslint-plugin-project-structure#ruleid'. 🔥\n\n`,
    );
