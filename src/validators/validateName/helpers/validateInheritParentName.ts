import { InheritParentName, Type } from "../../../types";
import { getInheritName } from "./getInheritName";
import { isRegex } from "./isRegex";
import { throwNameInvalid } from "./throwNameInvalid";
import { validateRegexPattern } from "./validateNamePattern";

export const validateInheritParentName = (
  nodeName: string,
  parentName: string,
  inheritParentName: InheritParentName,
  regex: string,
  nodeType: Type
) => {
  const inheritName = getInheritName(parentName, inheritParentName);

  if (isRegex(regex)) {
    const regexWithInheritName =
      regex.slice(0, 2) + inheritName + regex.slice(2);

    return validateRegexPattern(nodeName, regexWithInheritName, nodeType);
  }

  if (inheritName === nodeName) return;

  return throwNameInvalid(nodeName, inheritName, nodeType);
};
