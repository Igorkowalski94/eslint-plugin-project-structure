interface GetConvertedPositionIndexProps {
  positionIndex: number;
  bodyWithoutImportsLength: number;
}

export const getConvertedPositionIndex = ({
  positionIndex,
  bodyWithoutImportsLength,
}: GetConvertedPositionIndexProps): number => {
  if (positionIndex < 0) return 0;
  if (positionIndex > bodyWithoutImportsLength - 1)
    return bodyWithoutImportsLength - 1;
  return positionIndex;
};
