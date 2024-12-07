import styled from '@emotion/styled';
import { GlobalToken } from 'antd';

export const EnvsWrapper = styled.div<{ token: GlobalToken }>`
  height: 500px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  overflow-y: auto;

  .env-item {
    height: 48px;
    padding: 0 10px;
    border-bottom: 1px solid ${({ token }) => token.colorBorderSecondary};
    display: flex;
    align-items: center;
    flex-direction: row;
    .item-ckb {
      width: 30px;
    }
    .item-name {
      width: 30%;
    }
    .item-url {
      flex: 1;
    }
  }

  .header {
  }
  .env-list {
    flex: 1;
    .env-item {
      &.active {
        background-color: ${({ token }) => token.controlItemBgActive};
      }
      &:hover {
        background-color: ${({ token }) => token.controlItemBgHover};
      }
    }
  }
`;
