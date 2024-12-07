import styled from '@emotion/styled';
import { GlobalToken } from 'antd';

export const JsonViewWrapper = styled.div<{ token: GlobalToken }>`
  .react-json-view {
    border-radius: 5px;
    background-color: ${({ token }) => token.colorFillSecondary} !important;
    padding: 12px;
    word-break: break-all;
    font-family: auto !important;
  }
  .object-key {
    color: ${({ token }) => token.colorTextBase} !important;
  }

  .object-size {
    color: ${({ token }) => token.colorTextSecondary} !important;
  }

  .variable-row,
  .object-key-val {
    border-left-color: ${({ token }) => token.colorBorder} !important;
  }
`;

export const TextViewerWrapper = styled.div<{ token: GlobalToken }>`
  padding: 12px;
  border-radius: 5px;
  background-color: ${({ token }) => token.colorFillSecondary} !important;
  overflow: hidden;
  pre {
    overflow-x: auto;
  }
`;
