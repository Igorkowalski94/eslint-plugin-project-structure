import { RuleError } from "../../../errors/RuleError/RuleError";
import { getNodeType } from "../../getNodeType";

export const getNameRegexError = (
    nodeName: string,
    namePattern: string,
): RuleError => {
    const nodeType = getNodeType(nodeName);

    return new RuleError(
        `${nodeType} name ${nodeName} is invalid. it should match ${namePattern}`,
        `match name pattern ${namePattern}`,
    );
};
