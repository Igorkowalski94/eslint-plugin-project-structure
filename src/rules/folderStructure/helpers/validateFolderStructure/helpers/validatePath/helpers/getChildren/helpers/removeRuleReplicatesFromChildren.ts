import { Rule } from "rules/folderStructure/folderStructure.types";

export const removeRuleReplicatesFromChildren = (children: Rule[]): Rule[] =>
  children.reduce<Rule[]>((acc, child) => {
    if (!child.name) return [...acc, child];

    const isDuplicatedName = acc.some(
      ({ name, children }) =>
        name === child.name && !!child.children === !!children,
    );

    if (isDuplicatedName) return acc;

    return [...acc, child];
  }, []);
