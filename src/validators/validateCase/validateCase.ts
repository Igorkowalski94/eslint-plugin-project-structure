import { Rule } from "../../types";
import { throwCaseInvalid } from "../../validators/validateCase/helpers/throwCaseInvalid";
import {
  PASCAL_CASE_RE,
  CAMEL_CASE_RE,
  SNAKE_CASE_RE,
  KEBAB_CASE_RE,
} from "../../validators/validateCase/validateCase.consts";

export const validateCase = (nodeName: string, rule: Rule) => {
  if (typeof rule?.name === "string" || !rule?.name?.case) return;

  const ruleCase = rule?.name?.case;

  const isFile = nodeName.includes(".");

  const name = isFile ? nodeName.split(".")[0] : nodeName;

  switch (ruleCase) {
    case "PascalCase":
      if (!PASCAL_CASE_RE.test(name)) throwCaseInvalid(name, ruleCase, isFile);
      break;
    case "camelCase":
      if (!CAMEL_CASE_RE.test(name)) throwCaseInvalid(name, ruleCase, isFile);
      break;
    case "snake_case":
      if (!SNAKE_CASE_RE.test(name)) throwCaseInvalid(name, ruleCase, isFile);
      break;
    case "kebab-case":
    case "dash-case":
      if (!KEBAB_CASE_RE.test(name)) throwCaseInvalid(name, ruleCase, isFile);
      break;
  }
};
