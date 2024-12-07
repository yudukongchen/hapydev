import styled from '@emotion/styled';
import { GlobalToken } from 'antd';

export const AssertsWrapper = styled.div<{ token: GlobalToken }>`
  height: 100%;
  box-sizing: border-box;
  padding: 6px;
  display: flex;
  flex-direction: column;

  .assert-header {
    height: 26px;
  }

  .assert-contents {
    flex: 1;
    overflow: auto;

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
        white-space: nowrap;
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
      &:hover {
        background-color: ${({ token }) => token.controlItemBgHover};
      }
    }
  }
`;

export const EmptyWrapper = styled.div<{ token: GlobalToken }>`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .waring-text {
    padding-bottom: 10px;
  }

  .btn-go-write {
    margin-top: 10px;
    background-color: ${({ token }) => token.colorFillTertiary};
    color: ${({ token }) => token.colorText};
    &:hover {
      background-color: ${({ token }) => token.colorFillQuaternary} !important;
      color: ${({ token }) => token.colorText} !important;
    }
  }
`;
