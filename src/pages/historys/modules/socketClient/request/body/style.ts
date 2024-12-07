import styled from '@emotion/styled';
import { GlobalToken } from 'antd';

export const BodyWrapper = styled.div<{ token: GlobalToken }>`
  height: 100%;

  .data-modes {
    height: 44px;
    display: flex;
    align-items: center;
  }

  .monaco-panel {
    height: calc(100% - 46px);
    overflow: hidden;
  }
`;
