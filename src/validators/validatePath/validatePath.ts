import { getFolderTypeWithExtensionError } from "./helpers/getFolderTypeWithExtensionError";
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
    if (
        rule.ruleId &&
        (rule.type || rule.name || rule.children || rule.extension)
    )
        throw getRuleIdWithOtherKeysError((rule as RuleId).ruleId);

    const { nodeName, fileNameWithExtension } = getNodeName(pathname);
    const { name, children, extension, type } = getNodeRule(rule, config);

    if (type !== undefined && type !== "file" && type !== "folder")
        throw getInvalidTypeError(type);

    if (type === "folder" && extension)
        throw getFolderTypeWithExtensionError(extension);

    if (name) validateName(nodeName, name, parentName);

    if (extension && fileNameWithExtension)
        validateExtension(fileNameWithExtension, extension);

    if (children) validateChildren(pathname, nodeName, children, config);
};
