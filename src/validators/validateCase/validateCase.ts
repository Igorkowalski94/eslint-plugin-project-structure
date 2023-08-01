import { getCaseInvalidError } from "./helpers/getCaseInvalidError";
import { CaseType } from "../../types";
import {
    PASCAL_CASE_RE,
    CAMEL_CASE_RE,
    SNAKE_CASE_RE,
    KEBAB_CASE_RE,
} from "../../validators/validateCase/validateCase.consts";

export const validateCase = (nodeName: string, ruleCase: CaseType): void => {
    switch (ruleCase) {
        case "PascalCase":
            if (!PASCAL_CASE_RE.test(nodeName))
                throw getCaseInvalidError(nodeName, ruleCase);
            break;
        case "camelCase":
            if (!CAMEL_CASE_RE.test(nodeName))
                throw getCaseInvalidError(nodeName, ruleCase);
            break;
        case "snake_case":
            if (!SNAKE_CASE_RE.test(nodeName))
                throw getCaseInvalidError(nodeName, ruleCase);
            break;
        case "kebab-case":
        case "dash-case":
            if (!KEBAB_CASE_RE.test(nodeName))
                throw getCaseInvalidError(nodeName, ruleCase);
            break;
    }
};
