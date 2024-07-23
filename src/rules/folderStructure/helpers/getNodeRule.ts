import { getIdRule } from "./getIdRule";
import { isIdRule } from "./isIdRule";
import { FolderStructureConfig, Rule } from "../folderStructure.types";

export const getNodeRule = (rule: Rule, config: FolderStructureConfig): Rule =>
    isIdRule(rule) ? (getIdRule(rule, config) as Rule) : rule;
