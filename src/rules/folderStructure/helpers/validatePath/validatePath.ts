import {
    Rule,
    FolderStructureConfig,
} from "rules/folderStructure/folderStructure.types";
import { getNodeName } from "rules/folderStructure/helpers/getNodeName";
import { getRule } from "rules/folderStructure/helpers/getRule";
import { validateChildren } from "rules/folderStructure/helpers/validateChildren/validateChildren";
import { validateName } from "rules/folderStructure/helpers/validateName/validateName";

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
