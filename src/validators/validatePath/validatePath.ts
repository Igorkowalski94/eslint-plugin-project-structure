import { sep } from "path";

import { filterRulesByType } from "../../validators/validatePath/helpers/filterRulesByType";
import { isIdRule } from "../../helpers/isIdRule";

import { validateRulesList } from "../../validators/validateRulesList";
import { Rule, ProjectStructureConfig } from "../../types";
import { validateCase } from "../../validators/validateCase/validateCase";
import { validateExtension } from "../../validators/validateExtension/validateExtension";
import { validateName } from "../../validators/validateName/validateName";

export const validatePath = (
  filePath: string,
  parentName: string,
  rule: Rule,
  config: ProjectStructureConfig
) => {
  const configRule = isIdRule(rule) ? config.rules[rule.id] : rule;

  if (!configRule) return;

  const isFile = !filePath.includes(sep);
  const nodeNames = filePath.split(sep);
  const currentNodeName = isFile
    ? filePath.replace(/\.[a-z]+$/, "")
    : (nodeNames[0] as string);

  validateName(currentNodeName, parentName, configRule);
  validateCase(currentNodeName, configRule);
  validateExtension(nodeNames[0] as string, configRule);

  const nextPath = filePath.replace(`${currentNodeName}${sep}`, "");
  const childrenByFileType = (configRule.children || []).filter((node) =>
    filterRulesByType(nextPath, node, config)
  );

  if (childrenByFileType.length !== 0) {
    validateRulesList(childrenByFileType, nextPath, config, currentNodeName);
  }
};
