import path from "path";

import { isCorrectPattern } from "helpers/isCorrectPattern";
import { readConfigFile } from "helpers/readConfigFile/readConfigFile";
import { validateConfig } from "helpers/validateConfig";

import {
  Context,
  FileCompositionConfig,
  FileRules,
} from "rules/fileComposition/fileComposition.types";
import { FILE_COMPOSITION_SCHEMA } from "rules/fileComposition/helpers/getFileCompositionConfig/getFileCompositionConfig.consts";

// eslint-disable-next-line project-structure/file-composition
interface GetFileCompositionConfigReturn {
  config: FileCompositionConfig;
  fileConfig?: FileRules;
}

export const getFileCompositionConfig = ({
  cwd,
  filename,
  settings,
  options,
}: Context): GetFileCompositionConfigReturn => {
  const config = readConfigFile<FileCompositionConfig>({
    cwd,
    key: "project-structure/file-composition-config-path",
    settings,
    options: options[0],
  });

  validateConfig({ config, schema: FILE_COMPOSITION_SCHEMA });

  const filenamePath = path.relative(cwd, filename);
  const fileConfig = config.filesRules.find(({ filePattern }) =>
    isCorrectPattern({ input: filenamePath, pattern: filePattern }),
  );

  return { config, fileConfig };
};
