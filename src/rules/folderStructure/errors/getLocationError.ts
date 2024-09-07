interface GetLocationErrorProps {
  nodePath: string;
}

export const getLocationError = ({ nodePath }: GetLocationErrorProps): string =>
  `\nError location = ./${nodePath}\n\n`;
