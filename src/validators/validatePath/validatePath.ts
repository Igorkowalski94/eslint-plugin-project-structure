import { getInvalidRuleError } from "./helpers/getInvalidRuleError";
import { getInvalidTypeError } from "./helpers/getInvalidTypeError";
import { getNodeName } from "./helpers/getNodeName";
import { getNodeRule } from "../../helpers/getNodeRule/getNodeRule";
import { Rule, ProjectStructureConfig } from "../../types";
import { validateChildren } from "../validateChildren/validateChildren";
import { validateExtension } from "../validateExtension/validateExtension";
import { validateName } from "../validateName/validateName";

export const validatePath = (
    pathname: string,
    parentName: string,
    rule: Rule,
    config: ProjectStructureConfig,
): void => {
    if (!rule || typeof rule !== "object" || Array.isArray(rule))
        throw getInvalidRuleError(rule);

    const { nodeName, fileNameWithExtension } = getNodeName(pathname);
    const nodeRule = getNodeRule(rule, config);
    const { name, children, extension } = nodeRule;

    if (extension && children) throw getInvalidTypeError();

    if (name) validateName(nodeName, name, parentName);

    if (extension && fileNameWithExtension)
        validateExtension(fileNameWithExtension, extension);

    if (children) validateChildren(pathname, nodeName, children, config);
};
