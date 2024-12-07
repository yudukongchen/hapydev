import styled from '@emotion/styled';
import { GlobalToken } from 'antd';

export const HeadersWrapper = styled.div<{ token: GlobalToken }>`
  height: 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 5px;
  gap: 10px;
  .view-modes {
  }
  .txt-name {
    flex: 1;
    border-width: 0;
    font-size: 14px;
    background-color: transparent;
    border-radius: 0;
    &:hover,
    &:active {
      border-bottom-width: 1px;
    }
  }
  .buttons-panel {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 5px;
  }
`;
