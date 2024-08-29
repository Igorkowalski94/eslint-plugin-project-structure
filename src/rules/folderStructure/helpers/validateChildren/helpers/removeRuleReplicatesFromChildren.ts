import { Rule } from "rules/folderStructure/folderStructure.types";

export const removeRuleReplicatesFromChildren = (children: Rule[]): Rule[] => {
  const childrenWithoutDuplicates = Array.from(
    new Set(children.map((child) => JSON.stringify(child))),
  ).map((child) => JSON.parse(child) as Rule);

  return childrenWithoutDuplicates.reduce<Rule[]>((acc, child) => {
    if (!child.name) return [...acc, child];

    const isDuplicatedName = acc.some(({ name }) => name === child.name);

    if (isDuplicatedName) return acc;

    return [...acc, child];
  }, []);
};
