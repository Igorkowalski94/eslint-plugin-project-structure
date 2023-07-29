import { Rule } from "../../types";
import { throwNameInvalid } from "../../validators/validateName/helpers/throwNameInvalid";
import { validateRegexPattern } from "../../validators/validateName/helpers/validateNamePattern";
import { isRegex } from "./helpers/isRegex";
import { validateInheritParentName } from "./helpers/validateInheritParentName";

export const validateName = (
  nodeName: string,
  parentName: string,
  rule: Rule
) => {
  const nodeType = nodeName.includes(".") ? "file" : "folder";

  if (!rule?.name) return;

  const { name: ruleName } = rule;

  if (typeof ruleName === "string") {
    if (ruleName === nodeName) return;

    return throwNameInvalid(nodeName, ruleName, nodeType);
  }

  if (typeof ruleName !== "object") return;

  const { inheritParentName, regex } = ruleName;

  if (inheritParentName)
    return validateInheritParentName(
      nodeName,
      parentName,
      inheritParentName,
      regex,
      nodeType
    );

  if (isRegex(regex)) return validateRegexPattern(nodeName, regex, nodeType);
};
