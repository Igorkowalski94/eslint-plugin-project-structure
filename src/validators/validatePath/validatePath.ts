import { getInvalidTypeError } from "./helpers/getInvalidTypeError";
import { getNodeName } from "./helpers/getNodeName";
import { getRuleIdWithOtherKeysError } from "./helpers/getRuleIdWithOtherKeysError";
import { getNodeRule } from "../../helpers/getNodeRule/getNodeRule";
import { Rule, ProjectStructureConfig, RuleId } from "../../types";
import { validateChildren } from "../validateChildren/validateChildren";
import { validateExtension } from "../validateExtension/validateExtension";
import { validateName } from "../validateName/validateName";

export const validatePath = (
    pathname: string,
    parentName: string,
    rule: Rule,
    config: ProjectStructureConfig,
): void => {
    if (rule.ruleId && (rule.name || rule.children || rule.extension))
        throw getRuleIdWithOtherKeysError((rule as RuleId).ruleId);

    const { nodeName, fileNameWithExtension } = getNodeName(pathname);
    const nodeRule = getNodeRule(rule, config);
    const { name, children, extension } = nodeRule;

    if (extension && children) throw getInvalidTypeError();

    if (name) validateName(nodeName, name, parentName);

    if (extension && fileNameWithExtension)
        validateExtension(fileNameWithExtension, extension);

    if (children) validateChildren(pathname, nodeName, children, config);
};
