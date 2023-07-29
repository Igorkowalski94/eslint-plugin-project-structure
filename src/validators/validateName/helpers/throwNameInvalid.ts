import { RuleError } from "../../../errors/RuleError";
import { Type } from "../../../types";

export const throwNameInvalid = (
  nodeName: string,
  ruleName: string,
  nodeType: Type
) => {
  throw new RuleError(
    `${nodeType} name '${nodeName}' is invalid. it should be '${ruleName}'`,
    `have name '${ruleName}'`
  );
};
