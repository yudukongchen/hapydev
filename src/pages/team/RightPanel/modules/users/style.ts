import styled from '@emotion/styled';
import { GlobalToken } from 'antd';

export const UsersWrapper = styled.div<{ token: GlobalToken }>`
  padding: 0 10px;
  .list-headers {
    display: flex;
    justify-content: space-between;
    .txt-user {
      width: 200px;
      svg {
        color: currentColor;
      }
    }
  }
  .list-panel {
    margin-top: 10px;

    .ant-table-cell {
      vertical-align: middle;
    }

    .nick-name {
      display: flex;
      flex-direction: row;
      gap: 10px;
      align-items: center;
      .avatar {
        width: 36px;
        height: 36px;
        border: 1px solid ${({ token }) => token.colorBorderSecondary};
        border-radius: 4px;
        border: none;
        overflow: hidden;
        img {
          width: 36px;
          height: 36px;
        }
      }
      .name {
      }
    }
    .email {
    }
  }
`;
