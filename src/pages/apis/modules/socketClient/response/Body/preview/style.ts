import { css } from '@emotion/css';
import styled from '@emotion/styled';

export const PreviewWrapper = styled.div`
  height: 100%;
  overflow: hidden;
`;

export const pdfWrapper = css`
  height: 100%;
  overflow: auto;

  &.beautify-scrollbar {
    margin-right: 10px;
  }
`;

export const errWrapper = css`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
