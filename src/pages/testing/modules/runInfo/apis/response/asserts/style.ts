import styled from '@emotion/styled';
import { GlobalToken } from 'antd';

export const AssertWrapper = styled.div<{ token: GlobalToken }>`
  .asssert-item {
    display: flex;
    margin: 3px 0;
    padding: 3px 0;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    .item-status {
      height: 22px;
      line-height: 22px;
      padding: 0 10px;
      border-radius: 3px;
      &.success {
        color: ${({ token }) => token.colorWhite};
        background-color: ${({ token }) => token.colorSuccess};
      }
      &.failed {
        color: ${({ token }) => token.colorWhite};
        background-color: ${({ token }) => token.colorError};
      }
    }
    .item-message {
      flex: 1;
      line-height: 22px;
      color: ${({ token }) => token.colorTextSecondary};
      padding-left: 10px;
      .message {
        padding-left: 5px;
      }
    }
  }
`;
