import { isExportedName } from "rules/namingRules/helpers/validateName/helpers/validateFileRules/helpers/getCurrentData/helpers/isExportedName/isExportedName";
import { isNameFromFileRoot } from "rules/namingRules/helpers/validateName/helpers/validateFileRules/helpers/getCurrentData/helpers/isNameFromFileRoot";
import { ValidateNameProps } from "rules/namingRules/helpers/validateName/validateName";
import { NameType, NamingRule } from "rules/namingRules/namingRules.types";

interface GetCurrentDataProps {
  nameType: NameType;
  node: ValidateNameProps["node"];
  allowNames: NamingRule["allowNames"];
  allowNamesFileRoot: NamingRule["allowNamesFileRoot"];
  allowNamesExport: NamingRule["allowNamesExport"];
  name: string;
}

export interface GetCurrentDataReturn {
  currentName: string;
  currentAllowNames: string[] | undefined;
  currentNode: ValidateNameProps["node"];
}

export const getCurrentData = ({
  node,
  nameType,
  allowNames,
  allowNamesFileRoot,
  allowNamesExport,
  name,
}: GetCurrentDataProps): GetCurrentDataReturn => {
  const exportName = isExportedName({
    nameType,
    node,
    name,
  });

  if (allowNamesExport && exportName.isExportName)
    return {
      currentAllowNames: allowNamesExport,
      currentNode: exportName.currentNode,
      currentName: exportName.currentName,
    };

  if (
    isNameFromFileRoot({
      nameType,
      node,
    }) &&
    allowNamesFileRoot
  )
    return {
      currentAllowNames: allowNamesFileRoot,
      currentName: name,
      currentNode: node,
    };

  return {
    currentAllowNames: allowNames,
    currentName: name,
    currentNode: node,
  };
};
