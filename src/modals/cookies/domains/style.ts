import styled from '@emotion/styled';
import { GlobalToken } from 'antd';

export const LeftPanelWrapper = styled.div<{ token: GlobalToken }>`
  height: 100%;
  display: flex;
  flex-direction: column;
  .big-title {
    padding: 20px 10px;
    font-size: 18px;
    height: 30px;
  }
  .tab-list {
    flex: 1;
    padding: 0 10px;
    overflow: auto;
  }

  .tab-item {
    height: 36px;
    display: flex;
    align-items: center;
    margin: 5px 0;
    padding: 0 10px;
    border-radius: 5px;
    color: ${({ token }) => token.colorTextSecondary};
    font-size: 14px;
    cursor: pointer;
    white-space: nowrap;
    text-overflow: ellipsis;

    svg {
      width: 16px;
      height: 16px;
      margin-right: 8px;
    }

    &:hover {
      background-color: ${({ token }) => token.colorFillQuaternary};
    }
    &.active {
      background-color: ${({ token }) => token.colorFillTertiary};
    }
  }
`;
