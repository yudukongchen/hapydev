import styled from '@emotion/styled';
import { GlobalToken } from 'antd';

export const ChannelWrapper = styled.div<{ token: GlobalToken }>`
  height: 96px;
  display: flex;
  flex-direction: row;
  gap: 10px;
  justify-content: space-between;

  .channel-item {
    flex: 1;
    border: 1px solid ${({ token }) => token.colorBorder};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    cursor: pointer;
    .icon {
      width: 30px;
      height: 30px;
    }
    .text {
      padding-top: 5px;
      text-align: center;
    }
    &.selected {
      background-color: ${({ token }) => token.controlItemBgActive};
      border: 1px solid ${({ token }) => token.colorPrimary};
    }
  }
`;
