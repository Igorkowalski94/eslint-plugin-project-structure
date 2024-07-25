import { getNodeName } from "./helpers/getNodeName";
import { getInvalidRuleError } from "../../errors/getInvalidRuleError";
import { getInvalidTypeError } from "../../errors/getInvalidTypeError";
import { Rule, FolderStructureConfig } from "../../folderStructure.types";
import { getNodeRule } from "../getNodeRule";
import { validateChildren } from "../validateChildren/validateChildren";
import { validateExtension } from "../validateExtension/validateExtension";
import { validateName } from "../validateName/validateName";

interface ValidatePathProps {
    pathname: string;
    parentName: string;
    rule: Rule;
    config: FolderStructureConfig;
}

export const validatePath = ({
    pathname,
    parentName,
    rule,
    config,
}: ValidatePathProps): void => {
    if (!rule || typeof rule !== "object" || Array.isArray(rule))
        throw getInvalidRuleError(rule);

    const { nodeName, fileNameWithExtension } = getNodeName(pathname);

    const nodeRule = getNodeRule(rule, config);
    const { name, children, extension } = nodeRule;

    if (extension && children) throw getInvalidTypeError(nodeRule);

    if (name)
        validateName({
            nodeName,
            ruleName: name,
            parentName,
            regexParameters: config.regexParameters,
        });

    if (extension && fileNameWithExtension)
        validateExtension(fileNameWithExtension, extension);

    if (children) validateChildren({ pathname, nodeName, children, config });
};
