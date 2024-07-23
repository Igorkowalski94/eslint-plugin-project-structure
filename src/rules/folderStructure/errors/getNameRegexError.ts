import { RuleError } from "./RuleError";
import { getNodeType } from "../helpers/getNodeType";

export const getNameRegexError = (
    nodeName: string,
    regex: string,
): RuleError => {
    const nodeType = getNodeType(nodeName);

    return new RuleError(
        `${nodeType} name '${nodeName}' is invalid. it should match ${regex}`,
        `match name pattern ${regex}`,
    );
};
