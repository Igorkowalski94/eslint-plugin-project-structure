import {
  Rule,
  FolderStructureConfig,
} from "rules/folderStructure/folderStructure.types";
import { getRule } from "rules/folderStructure/helpers/getRule";
import { isFile as isFileFn } from "rules/folderStructure/helpers/isFile";

interface FilterRulesByTypeProps {
  pathname: string;
  rule: Rule;
  rules: FolderStructureConfig["rules"];
}

export const filterRulesByType = ({
  pathname,
  rule,
  rules,
}: FilterRulesByTypeProps): boolean => {
  const nodeRule = getRule({ rule, rules });

  const isFile = isFileFn(pathname);
  const isFolderNode = !!nodeRule.children;
  const isFileNode = !nodeRule.children;

  if (!isFile && isFolderNode) return true;
  if (isFile && isFileNode) return true;

  return false;
};
