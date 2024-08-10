import { getAllowedNamesError } from "rules/folderStructure/errors/getAllowedNamesError";
import { getBaseErrorEnd } from "rules/folderStructure/errors/getBaseErrorEnd";
import { getBaseErrorStart } from "rules/folderStructure/errors/getBaseErrorStart";
import { getNodeTypeError } from "rules/folderStructure/errors/getNodeTypeError";
import { ruleErrorGuard } from "rules/folderStructure/errors/ruleErrorGuard";
import {
    Rule,
    FolderStructureConfig,
} from "rules/folderStructure/folderStructure.types";
import { getNodeName } from "rules/folderStructure/helpers/getNodeName";
import { getNodeType } from "rules/folderStructure/helpers/getNodeType";
import { getNodePath } from "rules/folderStructure/helpers/validateChildren/helpers/getNodePath";
import { validatePath } from "rules/folderStructure/helpers/validatePath/validatePath";

interface ValidateRulesListProps {
    pathname: string;
    filenameWithoutCwd: string;
    parentName: string;
    nodesList: Rule[];
    config: FolderStructureConfig;
    cwd: string;
}

export const validateRulesList = ({
    pathname,
    filenameWithoutCwd,
    parentName,
    nodesList,
    config,
    cwd,
}: ValidateRulesListProps): void => {
    const nodeName = getNodeName(pathname);
    const nodeType = getNodeType(pathname);
    const nodePath = getNodePath({ filenameWithoutCwd, nodeName });

    let errorMessage = getBaseErrorStart({ nodeName, nodeType });
    let allowedNamesCount = 0;

    if (nodesList.length === 0)
        throw getNodeTypeError({ errorMessage, nodePath, nodeType });

    for (const childNode of nodesList) {
        try {
            validatePath({
                pathname,
                filenameWithoutCwd,
                parentName,
                rule: childNode,
                config,
                cwd,
            });
            return;
        } catch (error) {
            if (
                ruleErrorGuard(error) &&
                !errorMessage.includes(error.message)
            ) {
                errorMessage += getAllowedNamesError({
                    allowedNamesCount,
                    error,
                });

                allowedNamesCount++;
            } else {
                throw error;
            }
        }
    }

    throw getBaseErrorEnd({ errorMessage, nodePath });
};
