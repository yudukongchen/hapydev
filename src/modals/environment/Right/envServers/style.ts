import styled from '@emotion/styled';
import { GlobalToken } from 'antd';

export const ServerListWrapper = styled.div<{ token: GlobalToken }>`
  .table {
    td {
      height: 33px;
      padding: 0 5px;
      background-color: transparent !important;
    }
    .env-name-item {
      width: 100%;
      display: flex;
      flex-direction: row;
      box-sizing: border-box;
      align-items: center;
      font-size: 12px;
      .env-name {
        flex: 1;
        display: flex;
        .icon-default {
          padding: 0 5px;
          border-radius: 3px;
          color: ${({ token }) => token.colorWhite};
          margin-left: 8px;
          background-color: ${({ token }) => token.colorPrimary};
        }
      }
    }
    .env-url-item {
      border: none;
      border-radius: 0;
      background-color: transparent;
    }
  }

  .btns-panel {
    margin-top: 5px;
  }
`;
