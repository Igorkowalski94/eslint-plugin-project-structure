import { FinalError } from "../../../errors/FinalError/FinalError";

export const getIdRuleError = (ruleId: string): FinalError =>
    new FinalError(
        `\n\n🔥 "ruleId": "${ruleId}" does not exist in object "rules", correct it in your '.projectStructurerc'. 🔥\n\n`,
    );
