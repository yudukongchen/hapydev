import styled from '@emotion/styled';
import { GlobalToken } from 'antd';

export const TextViewerWrapper = styled.div<{ token: GlobalToken }>`
  padding: 12px;
  border-radius: 5px;
  background-color: ${({ token }) => token.colorFillSecondary} !important;
  overflow: hidden;
  pre {
    line-height: 22px;
    text-wrap-mode: wrap;
  }
`;
