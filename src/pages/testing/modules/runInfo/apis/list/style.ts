import styled from '@emotion/styled';
import { GlobalToken } from 'antd';

export const ListWrapper = styled.div<{ token: GlobalToken }>`
  .list-item {
    display: flex;
    flex-direction: row;
    margin-bottom: 10px;
    gap: 20px;
    border: 1px solid ${({ token }) => token.colorBorderSecondary};
    border-radius: 4px;
    padding: 10px;
    cursor: pointer;
    &:hover {
      background-color: ${({ token }) => token.colorFillTertiary};
    }
    .result {
      height: 24px;
      display: flex;
      align-items: center;
      padding: 0 5px;
      border-radius: 4px;
      color: ${({ token }) => token.colorWhite};
      &.success {
        background-color: ${({ token }) => token.colorSuccess};
      }
      &.failed {
        background-color: ${({ token }) => token.colorError};
      }
    }
    .green {
      color: ${({ token }) => token.colorSuccess};
    }
    .red {
      color: ${({ token }) => token.colorError};
    }
    .method {
      width: 50px;
    }
    .api-name {
      width: 120px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .url {
      flex: 1;
      width: 0;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
`;
