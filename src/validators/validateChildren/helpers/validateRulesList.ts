import { sep } from "path";

import { FinalError } from "../../../errors/FinalError/FinalError";
import { finalErrorGuard } from "../../../errors/FinalError/helpers/finalErrorGuard";
import { ruleErrorGuard } from "../../../errors/RuleError/helpers/ruleErrorGuard";
import { getNodeType } from "../../../helpers/getNodeType";
import { Rule, ProjectStructureConfig } from "../../../types";
import { validatePath } from "../../validatePath/validatePath";

interface ValidateRulesList {
    pathname: string;
    parentName: string;
    nodesList: Rule[];
    config: ProjectStructureConfig;
}

export const validateRulesList = ({
    pathname,
    parentName,
    nodesList,
    config,
}: ValidateRulesList): void => {
    const nodeName = pathname.split(sep)[0];
    const nodeType = getNodeType(nodeName);

    let errorMessage = `\n\n 🔥🔥🔥 ${nodeType} '${nodeName}' is invalid:\n\n It should `;
    let countAddedMessages = 0;

    if (nodesList.length === 0) {
        if (nodeType === "Folder") errorMessage += "be a file.";
        if (nodeType === "File") errorMessage += "be a folder.";
    }

    for (const childNode of nodesList) {
        try {
            validatePath({ pathname, parentName, rule: childNode, config });
            return;
        } catch (error) {
            if (finalErrorGuard(error) && error.type === "final")
                throw new FinalError(error.message);

            if (
                ruleErrorGuard(error) &&
                !errorMessage.includes(error.ruleMessage)
            ) {
                if (countAddedMessages === 0) {
                    errorMessage += error.ruleMessage;
                } else {
                    errorMessage += "\n or " + error.ruleMessage;
                }

                countAddedMessages++;
            }
        }
    }

    throw new FinalError(`${errorMessage} \n\n 🔥🔥🔥`);
};
