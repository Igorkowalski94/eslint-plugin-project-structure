import { RuleError } from "../../../errors/RuleError";

export const throwExtensionInvalid = (
  nodeName: string,
  extension: string | string[]
) => {
  throw new RuleError(
    `File name '${nodeName}' should end with '${extension}'`,
    `end with '${extension}'`
  );
};
