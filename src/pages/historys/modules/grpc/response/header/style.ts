import { css } from '@emotion/css';
import styled from '@emotion/styled';
import { GlobalToken } from 'antd';

export const ResponseHeader = styled.div<{ token: GlobalToken }>`
  width: 100%;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  user-select: text !important;
  .left {
    display: flex;
    align-items: center;
    gap: 8px;
    .case-title {
      white-space: nowrap;
    }

    .message-types {
      height: 24px;
      display: flex;
      align-items: center;
      white-space: nowrap;
      flex-direction: row;
      gap: 5px;
      padding: 0 8px;
      border-radius: 4px;
      cursor: pointer;
    }
  }

  .right {
    .conn-satatus {
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: 0 6px;
      border-radius: 4px;
      gap: 5px;
      .icon {
        width: 6px;
        height: 6px;
        border-radius: 50%;
      }
      &.connected {
        background-color: ${({ token }) => token.colorSuccessBg};
        .icon {
          background-color: ${({ token }) => token.colorSuccess};
        }
      }
      &.disconnected {
        background-color: ${({ token }) => token.colorErrorBg};
        .icon {
          background-color: ${({ token }) => token.colorError};
        }
      }
    }
  }
`;

export const messageTypeWrapper = css`
  .msg-type-icon {
    width: 16px;
    height: 16px;
    margin-right: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      fill: var(--ant-color-text-base);
    }
    &.sent {
      background-color: var(--ant-color-warning-bg-hover);
    }
    &.receive {
      background-color: var(--ant-color-info-bg-hover);
    }
  }
`;
