import styled from '@emotion/styled';
import { GlobalToken } from 'antd';

export const ItemNodeWrapper = styled.div<{ token: GlobalToken }>`
  .node-inner {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;

    &.draging {
      opacity: 0.2;
    }

    .drag-icon {
      width: 20px;
      display: flex;
      justify-content: center;
      align-items: flex-start;
      cursor: move;
      svg {
        margin-top: 12px;
        width: 14px;
        height: 14px;
        fill: ${({ token }) => token.colorTextDescription};
      }
    }

    .item-node {
      flex: 1;
      border: 1px solid ${({ token }) => token.colorBorderSecondary};
      margin-left: 5px;
      border-radius: 5px;
      background-color: ${({ token }) => token.colorBgBase};

      &.disabled {
        background-color: ${({ token }) => token.colorErrorBg};
        color: ${({ token }) => token.colorTextDisabled};
      }
      &.not-support {
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px dashed ${({ token }) => token.colorError};
        background-color: ${({ token }) => token.colorErrorBg};
        color: ${({ token }) => token.colorErrorText};
        padding: 0 10px;
        .error-panel {
          flex: 1;
          padding-left: 5px;
        }
      }

      .item-node-header {
        height: 40px;
        background-color: ${({ token }) => token.colorFillTertiary};
        box-sizing: content-box;
        padding: 0 10px;
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 5px;
        cursor: pointer;
        .expand-icon {
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          &.expand {
            transform: rotate(90deg);
          }
          svg {
            fill: ${({ token }) => token.colorTextDescription};
          }
        }

        .node-type {
          height: 24px;
          line-height: 24px;
          font-size: 12px;
          border-radius: 3px;
          padding: 0 5px;
          color: ${({ token }) => token.colorWhite};
          &.api {
            background-color: #52c41b99;
          }
          &.if {
            background-color: #13c2c299;
          }
          &.group {
            background-color: #fa8c1599;
          }
          &.for {
            background-color: #1977ff99;
          }
          &.wait {
            background-color: #9373ee99;
          }
        }
      }
      .item-node-content {
        padding: 0 10px;
      }
    }
  }
`;
