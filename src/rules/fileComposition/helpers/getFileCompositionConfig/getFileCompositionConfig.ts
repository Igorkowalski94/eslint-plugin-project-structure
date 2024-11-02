import path from "path";

import { getProjectRoot } from "helpers/getProjectRoot";
import { isCorrectPattern } from "helpers/isCorrectPattern";
import { readConfigFile } from "helpers/readConfigFile/readConfigFile";
import { validateConfig } from "helpers/validateConfig";

import {
  Context,
  FileCompositionConfig,
  FileRules,
} from "rules/fileComposition/fileComposition.types";
import { FILE_COMPOSITION_SCHEMA } from "rules/fileComposition/helpers/getFileCompositionConfig/getFileCompositionConfig.consts";

interface GetFileCompositionConfigReturn {
  config: FileCompositionConfig;
  fileConfig?: FileRules;
}

export const getFileCompositionConfig = ({
  filename,
  settings,
  options,
}: Context): GetFileCompositionConfigReturn => {
  const config = readConfigFile<FileCompositionConfig>({
    key: "project-structure/file-composition-config-path",
    settings,
    options: options[0],
  });

  validateConfig({ config, schema: FILE_COMPOSITION_SCHEMA });

  const filenamePath = path.relative(
    getProjectRoot(config.projectRoot),
    filename,
  );
  const fileConfig = config.filesRules.find(({ filePattern }) =>
    isCorrectPattern({ input: filenamePath, pattern: filePattern }),
  );

  return { config, fileConfig };
};
