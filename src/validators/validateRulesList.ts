import { sep } from "path";

import { FinalValidationError } from "../errors/FinalValidationError";
import { Rule, ProjectStructureConfig } from "../types";
import { validatePath } from "../validators/validatePath/validatePath";

export const validateRulesList = (
  nodesList: Rule[],
  filePath: string,
  config: ProjectStructureConfig,
  parentName: string
) => {
  const isFile = !filePath.includes(sep);
  const nodeType = isFile ? "File" : "Folder";
  const nodeName = filePath.split(sep)[0];

  let errorMessage = `\n\n 🔥🔥🔥 ${nodeType} '${nodeName}' is invalid:\n\n It should `;
  let countAddedMessages = 0;

  for (const childNode of nodesList) {
    try {
      validatePath(filePath, parentName, childNode, config);
      return;
    } catch (error) {
      if (error.type === "final") throw new FinalValidationError(error.message);

      if (!errorMessage.includes(error.ruleMessage)) {
        if (countAddedMessages === 0) {
          errorMessage += error.ruleMessage;
        } else {
          errorMessage += "\n or " + error.ruleMessage;
        }

        countAddedMessages++;
      }
    }
  }

  throw new FinalValidationError(`${errorMessage}. \n\n 🔥🔥🔥`);
};
