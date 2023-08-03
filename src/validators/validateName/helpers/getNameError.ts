import { RuleError } from "../../../errors/RuleError/RuleError";
import { getNodeType } from "../../../helpers/getNodeType";

export const getNameError = (nodeName: string, ruleName: string): RuleError => {
    const nodeType = getNodeType(nodeName);

    return new RuleError(
        `${nodeType} name '${nodeName}' is invalid. it should be '${ruleName}'`,
        `have name '${ruleName}'`,
    );
};
