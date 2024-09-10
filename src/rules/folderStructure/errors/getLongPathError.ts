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
  `🔥 Long path detected. 🔥\n\nToo long paths can cause various issues, such as errors when moving or copying a project, unexpected behavior of various tools.\nTry flattening the folder structure or using shorter names for nested folders.\nIf you know what you're doing and don't want to see this message, set 'longPathsInfo' in the configuration to 'false'.\n\nMax length = ${pathMaxLength.toString()}\nPath length = ${String(path.length)}\nPath = ${path}\n\n${ruleNameInfo}`;
