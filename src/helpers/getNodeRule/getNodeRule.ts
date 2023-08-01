import { isIdRule } from "./helpers/isIdRule";
import { Rule, ProjectStructureConfig } from "../../types";
import { getIdRule } from "../getIdRule/getIdRule";

export const getNodeRule = (
    rule: Rule,
    config: ProjectStructureConfig,
): Rule => (isIdRule(rule) ? (getIdRule(rule, config) as Rule) : rule);
