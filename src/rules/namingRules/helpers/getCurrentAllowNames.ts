import { isExportName } from "rules/namingRules/helpers/isExportName";
import { isNameFromFileRoot } from "rules/namingRules/helpers/isNameFromFileRoot";
import { ValidateNameProps } from "rules/namingRules/helpers/validateName";
import { NameType, NamingRule } from "rules/namingRules/namingRules.types";

interface GetCurrentAllowNamesProps {
  nameType: NameType;
  node: ValidateNameProps["node"];
  allowNames: NamingRule["allowNames"];
  allowNamesFileRoot: NamingRule["allowNamesFileRoot"];
  allowNamesExport: NamingRule["allowNamesExport"];
}

export const getCurrentAllowNames = ({
  node,
  nameType,
  allowNames,
  allowNamesFileRoot,
  allowNamesExport,
}: GetCurrentAllowNamesProps): string[] | undefined => {
  if (
    isExportName({
      nameType,
      node,
    }) &&
    allowNamesExport
  )
    return allowNamesExport;

  if (
    isNameFromFileRoot({
      nameType,
      node,
    }) &&
    allowNamesFileRoot
  )
    return allowNamesFileRoot;

  return allowNames;
};
