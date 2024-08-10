import { Rule } from "rules/folderStructure/folderStructure.types";

export const removeRuleReplicatesFromChildren = (children: Rule[]): Rule[] =>
    Array.from(new Set(children.map((child) => JSON.stringify(child)))).map(
        (child) => JSON.parse(child) as Rule,
    );
