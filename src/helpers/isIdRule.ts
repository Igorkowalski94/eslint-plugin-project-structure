import { Id, Rule } from "../types";

export const isIdRule = (rule: Rule): rule is Id => "id" in rule;
