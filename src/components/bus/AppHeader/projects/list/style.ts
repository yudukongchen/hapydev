import styled from '@emotion/styled';
import { GlobalToken } from 'antd';

export const ListWrapper = styled.div<{ token: GlobalToken }>`
  background-color: ${({ token }) => token.colorBgElevated};
  box-shadow: ${({ token }) => token.boxShadowSecondary};
  border-radius: 8px;
  border: 1px solid ${({ token }) => token.colorBorderSecondary};
  width: 360px;
  box-sizing: border-box;
  padding: 10px;
  overflow: hidden;
  .header {
    height: 24px;
    padding: 0 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    span {
      color: ${({ token }) => token.colorText};
      font-size: 14px;
    }
  }
  .search-box {
    margin-top: 12px;
  }
  .list-panel {
    margin-top: 12px;
    max-height: 40vh;
    overflow: auto;
    .ant-collapse {
      background-color: transparent;
      .ant-collapse-item {
        border-bottom-color: ${({ token }) => token.colorBorderSecondary};
      }
      .ant-collapse-header {
        // height: 62px;
        padding: 10px 8px;
        align-items: center;
        .ant-collapse-header-text {
          display: flex;
          justify-content: space-between;
          gap: 10px;
          .t-name {
            flex: 1;
            display: flex;
            align-items: center;
            gap: 5px;
            svg {
              width: 16px;
              height: 16px;
            }
            .t-title {
              flex: 1;
              width: 0;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
          }

          .p-count {
            display: inline-flex;
            border-radius: 4px;
            min-width: 20px;
            justify-content: center;
            padding: 0 2px;
            background-color: ${({ token }) => token.colorFillSecondary};
          }
        }
      }
      .child-list {
        display: flex;
        flex-direction: column;
        gap: 5px;
      }
      .c-item {
        height: 32px;
        padding: 0 5px;
        border-radius: 4px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
        gap: 10px;

        .item-left {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 5px;
          img {
            width: 16px;
            height: 16px;
          }
          .p-title {
            flex: 1;
            width: 0;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
        .btn {
          padding: 2px 4px;
          &:hover {
            color: ${({ token }) => token.colorTextTertiary};
          }
        }

        &:hover {
          background-color: ${({ token }) => token.colorFillSecondary};
        }
        &.active {
          font-weight: 500;
          background-color: ${({ token }) => token.colorFillSecondary};
        }
      }
    }
    .expand-icon {
      width: 14px;
      height: 14px;
      fill: ${({ token }) => token.colorTextDescription};
      &.active {
        transform: rotate(90deg);
      }
    }
  }
`;
