import { getNodePath } from "./getNodePath";
import { getAllowedNamesError } from "../../../errors/getAllowedNamesError";
import { getBaseErrorEnd } from "../../../errors/getBaseErrorEnd";
import { getBaseErrorStart } from "../../../errors/getBaseErrorStart";
import { getNodeTypeError } from "../../../errors/getNodeTypeError";
import { ruleErrorGuard } from "../../../errors/ruleErrorGuard";
import { Rule, FolderStructureConfig } from "../../../folderStructure.types";
import { getNodeName } from "../../getNodeName";
import { getNodeType } from "../../getNodeType";
import { validatePath } from "../../validatePath/validatePath";

interface ValidateRulesListProps {
    pathname: string;
    filenameWithoutCwd: string;
    parentName: string;
    nodesList: Rule[];
    config: FolderStructureConfig;
}

export const validateRulesList = ({
    pathname,
    filenameWithoutCwd,
    parentName,
    nodesList,
    config,
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
