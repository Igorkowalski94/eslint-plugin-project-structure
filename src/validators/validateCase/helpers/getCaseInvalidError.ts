import { RuleError } from "../../../errors/RuleError/RuleError";
import { getNodeType } from "../../../helpers/getNodeType";

export const getCaseInvalidError = (
    nodeName: string,
    expectedCase: string,
): RuleError => {
    const nodeType = getNodeType(nodeName);

    return new RuleError(
        `${nodeType} name error: Case is invalid: '${nodeName}', it should have '${expectedCase}'`,
        `match case '${expectedCase}'`,
    );
};
