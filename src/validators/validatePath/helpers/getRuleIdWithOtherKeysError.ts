import { FinalError } from "../../../errors/FinalError/FinalError";

export const getRuleIdWithOtherKeysError = (ruleId: string): FinalError =>
    new FinalError(
        `\n\n🔥 Property "ruleId": '${ruleId}' should not be used with other object keys. See documentation 'https://github.com/Igorkowalski94/eslint-plugin-project-structure#ruleid'. 🔥\n\n`,
    );
