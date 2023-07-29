import { RuleError } from "../../../errors/RuleError";
import { Type } from "../../../types";

export const throwNamePatternInvalid = (
  nodeName: string,
  namePattern: string,
  nodeType: Type
) => {
  throw new RuleError(
    `${nodeType} name ${nodeName} is invalid. it should match ${namePattern}`,
    `match name pattern ${namePattern}`
  );
};
