import { RuleError } from "../../../errors/RuleError";

export const throwCaseInvalid = (
  name: string,
  expectedCase: string,
  isFile: boolean
) => {
  const nodeType = isFile ? "File" : "Folder";

  throw new RuleError(
    `${nodeType} name error: Case is invalid: '${name}', it should have '${expectedCase}'`,
    `match case '${expectedCase}'`
  );
};
