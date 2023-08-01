import { getNodeName } from "./helpers/getNodeName";
import { getNodeRule } from "../../helpers/getNodeRule/getNodeRule";
import { Rule, ProjectStructureConfig } from "../../types";
import { validateCase } from "../validateCase/validateCase";
import { validateChildren } from "../validateChildren/validateChildren";
import { validateExtension } from "../validateExtension/validateExtension";
import { validateInheritParentName } from "../validateInheritParentName/validateInheritParentName";
import { validateName } from "../validateName/validateName";

export const validatePath = (
    pathname: string,
    parentName: string,
    rule: Rule,
    config: ProjectStructureConfig,
): void => {
    const { nodeName, fileNameWithExtension } = getNodeName(pathname);
    const nodeRule = getNodeRule(rule, config);

    const { name } = nodeRule;

    if (name) {
        if (typeof name === "object" && name.inheritParentName) {
            validateInheritParentName(nodeName, parentName, name);
        } else {
            validateName(nodeName, name);
        }
    }

    if (typeof name === "object" && name.case)
        validateCase(nodeName, name.case);

    if (fileNameWithExtension)
        validateExtension(fileNameWithExtension, nodeRule);

    if (nodeRule.children)
        validateChildren(pathname, nodeName, nodeRule, config);
};
