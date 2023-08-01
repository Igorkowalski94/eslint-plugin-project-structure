import { FinalError } from "../../../errors/FinalError/FinalError";

export const getIncorrectIdRuleError = (ruleId: string): FinalError =>
    new FinalError(
        `ruleId '${ruleId}' does not exist in object 'rules', correct it in your .projectStructurerc`,
    );
