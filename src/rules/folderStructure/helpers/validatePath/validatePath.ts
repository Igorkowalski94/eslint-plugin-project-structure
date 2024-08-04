import { Rule, FolderStructureConfig } from "../../folderStructure.types";
import { getNodeName } from "../getNodeName";
import { getRule } from "../getRule";
import { validateChildren } from "../validateChildren/validateChildren";
import { validateName } from "../validateName/validateName";

interface ValidatePathProps {
    pathname: string;
    filenameWithoutCwd: string;
    parentName: string;
    rule: Rule;
    config: FolderStructureConfig;
}

export const validatePath = ({
    pathname,
    filenameWithoutCwd,
    parentName,
    rule,
    config,
}: ValidatePathProps): void => {
    const nodeName = getNodeName(pathname);
    const nodeRule = getRule({ rule, rules: config.rules });

    const { name, children } = nodeRule;

    if (name)
        validateName({
            nodeName,
            ruleName: name,
            parentName,
            regexParameters: config.regexParameters,
        });

    if (children)
        validateChildren({
            pathname,
            filenameWithoutCwd,
            nodeName,
            children,
            config,
        });
};
