interface GetLongPathErrorProps {
  path: string;
  pathMaxLength: number;
  ruleNameInfo: string;
}

export const getLongPathError = ({
  pathMaxLength,
  path,
  ruleNameInfo,
}: GetLongPathErrorProps): string =>
  `🔥 Long path detected. 🔥\n\nOverly long paths can cause various issues, such as errors when moving/copying the project, problems with eslint, and many others.\nTry flattening the folder structure or using shorter names for nested folders.\nIf you know what you're doing and don't want to see this message, set 'longPathsInfo' in the configuration to 'false'.\n\nMax length = ${pathMaxLength.toString()}\nPath = ${path}\n\n${ruleNameInfo}`;
