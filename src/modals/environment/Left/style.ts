import { css } from '@emotion/css';
import styled from '@emotion/styled';
import { GlobalToken } from 'antd';

export const LeftPanelWrapper = styled.div<{ token: GlobalToken }>`
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 10px;
  .big-title {
    padding: 20px 10px;
    font-size: 18px;
    height: 30px;
    border-bottom: 1px solid ${({ token }) => token.colorBorderSecondary};
  }
  .env-list {
    flex: 1;
    margin: 10px 0;
    overflow: hidden;
    overflow-y: auto;

    .env-item {
      height: 36px;
      display: flex;
      align-items: center;
      margin: 5px 0;
      padding: 0 10px;
      border-radius: 5px;
      color: ${({ token }) => token.colorTextSecondary};
      font-size: 14px;
      cursor: pointer;

      gap: 6px;

      &-icon {
        width: 20px;
        height: 20px;
        line-height: 20px;
        font-size: 12px !important;
        border-radius: 2px;
        display: block;
        justify-content: center;
        align-items: center;
        text-align: center;
        white-space: nowrap;
      }
      &-text {
        flex: 1;
        width: 0;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;

        .env-default {
          display: inline-block;
          width: 16px;
          height: 16px;
          font-size: 12px;
          display: inline-flex;
          justify-content: center;
          align-items: center;
          border-radius: 3px;
          margin-left: 5px;
          color: ${({ token }) => token.colorWhite};
          background-color: ${({ token }) => token.colorPrimary};
        }
      }
      .env-item-btns {
        visibility: hidden;
      }

      &:hover {
        background-color: ${({ token }) => token.colorFillQuaternary};
        .env-item-btns {
          visibility: visible;
        }
      }
      &.active {
        background-color: ${({ token }) => token.colorFillTertiary};
      }
    }

    .add-panel {
      border-top: 1px solid ${({ token }) => token.colorBorderSecondary};
      padding-top: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`;
