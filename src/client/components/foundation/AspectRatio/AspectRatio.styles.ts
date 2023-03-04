import { css } from '@emotion/css';

export const container = ({
  clientHeight, ratioHeight, ratioWidth
}: {
  clientHeight: number | undefined,
  ratioHeight: number | undefined,
  ratioWidth: number | undefined }) => css`
  height: ${clientHeight ?? 0}px;  
  aspect-ratio: ${ratioWidth} / ${ratioHeight};
  position: relative;
  width: 100%;
`;
