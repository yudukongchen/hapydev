import styled from '@emotion/styled';
import { GlobalToken } from 'antd';

export const AuthWrapper = styled.div<{ token: GlobalToken }>`
  display: flex;
  flex-direction: row;

  .left-auth-panel {
    width: 300px;
    border-right: 1px solid ${({ token }) => token.colorBorderSecondary};
    padding: 10px 10px;
    overflow: auto;
    .auth-type-select {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .helper-text {
      padding-top: 20px;
      color: ${({ token }) => token.colorTextDescription};
    }
  }
  .right-auth-panel {
    flex: 1;
    padding: 10px 10px;
    overflow: auto;

    .no-auth {
      height: 28px;
      display: flex;
      align-items: center;
    }

    .content-helper-text {
      padding-bottom: 10px;
      overflow: hidden;
      color: ${({ token }) => token.colorTextDescription};
    }

    .auth-content {
      width: 100%;
      display: flex;
      flex-direction: column;
      padding-left: 8px;
      box-sizing: border-box;

      .cate-name {
        margin-top: 10px;
        font-size: ${({ token }) => token.fontSizeLG + 'px'};
        // font-weight: ${({ token }) => token.fontWeightStrong};
      }
      .auth-item {
        display: flex;
        flex-direction: row;
        padding: 0;
        padding-bottom: 8px;
        .title {
          width: 200px;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          margin-right: 8px;
        }
        .item-case {
          flex: 1;
          .textarea-wrapper {
            height: 28px;
            /* .textarea {
              border: 1px solid var(--border-color-default);
              background-color: var(--background-color-primary);
            } */
          }
        }
      }
      .auth-item-center {
        cursor: pointer;
        padding: 8px 0;
        display: flex;
        align-items: center;
      }

      .ckb-item {
        padding: 5px 0;
        &.right {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          padding-bottom: 15px;
        }
      }

      .token-item {
        padding: 8px;
        border-radius: 4px;
        background-color: ${({ token }) => token.colorSuccessBg};
        .token-header {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 10px;
        }
        .token-text {
          padding: 5px 0;
          word-wrap: break-word;
          word-break: break-all;
          font-size: ${({ token }) => token.fontSizeSM};
        }
        .time {
          color: ${({ token }) => token.colorSuccessText};
          background-color: ${({ token }) => token.colorFillQuaternary};
        }
        &.null {
          background-color: ${({ token }) => token.colorWarningBg};
          color: ${({ token }) => token.colorWarningText};
        }
        &.expired {
          .time {
            color: ${({ token }) => token.colorErrorText};
          }
        }
      }
    }
  }
`;
