import { sep } from "path";
import { isIdRule } from "../../../helpers/isIdRule";
import { ProjectStructureConfig, Rule } from "../../../types";

export const filterRulesByType = (
  nextPath: string,
  node: Rule,
  config: ProjectStructureConfig
) => {
  const configNode = isIdRule(node) ? config.rules[node.id] : node;

  if (!configNode) return;

  const isFile = !nextPath.includes(sep);
  const isFolderNode =
    configNode.children != null || configNode.type === "folder";
  const isFileNode = configNode.extension || configNode.type == "file";

  if (!isFileNode && !isFolderNode) return true;
  if (!isFile && isFolderNode) return true;
  if (isFile && isFileNode) return true;
  return false;
};
