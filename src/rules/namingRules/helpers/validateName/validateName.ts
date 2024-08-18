import path from "path";

import { TSESTree } from "@typescript-eslint/utils";
import micromatch from "micromatch";

import { readConfigFile } from "helpers/readConfigFile";
import { validateConfig } from "helpers/validateConfig";

import { validateFileRules } from "rules/namingRules/helpers/validateName/helpers/validateFileRules/validateFileRules";
import { NAMING_RULES_SCHEMA } from "rules/namingRules/helpers/validateName/validateName.consts";
import {
  Context,
  FileNamingRules,
  NameType,
} from "rules/namingRules/namingRules.types";

export interface ValidateNameProps {
  name: string;
  context: Context;
  node:
    | TSESTree.VariableDeclarator
    | TSESTree.ClassDeclaration
    | TSESTree.FunctionDeclaration
    | TSESTree.TSTypeAliasDeclaration
    | TSESTree.TSInterfaceDeclaration
    | TSESTree.TSEnumDeclaration
    | TSESTree.Identifier;
  nameType: NameType;
}

export const validateName = ({
  name,
  context: { filename, report, options, cwd, settings },
  node,
  nameType,
}: ValidateNameProps): void => {
  const config = readConfigFile<FileNamingRules[]>({
    cwd,
    key: "project-structure/naming-rules-config-path",
    settings,
    options: options.length ? options : undefined,
  });

  validateConfig({ config, schema: NAMING_RULES_SCHEMA });

  const filenamePath = path.resolve(cwd, filename);

  const fileRules = config.find(({ filePattern }) =>
    micromatch.every(filenamePath, filePattern),
  );

  if (!fileRules) return;

  validateFileRules({ fileRules, name, nameType, node, report, filenamePath });
};
