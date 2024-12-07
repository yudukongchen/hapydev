import styled from '@emotion/styled';
import { GlobalToken } from 'antd';

export const OpenApiWrapper = styled.div<{ token: GlobalToken }>`
  flex: 1;
  height: 0;
  display: flex;
  flex-direction: column;
  .case-title {
    margin-top: 20px;
    padding-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .left {
      flex: 1;
      .title {
        font-size: 16px;
        font-weight: 500;
      }
      .desc {
        margin-left: 6px;
        color: ${({ token }) => token.colorTextDescription};
      }
    }
    .slot-item {
      display: flex;
      align-items: center;
      gap: 5px;
      /* svg {
        width: 12px;
        height: 12px;
        fill: currentColor;
      } */
    }
  }
  .empty-item {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .token-list {
    overflow: auto;
    margin-bottom: 10px;
    .token-item {
      border: 1px solid ${({ token }) => token.colorBorderSecondary};
      margin-bottom: 10px;
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: 5px 10px;
      border-radius: 5px;
      gap: 20px;
      &:hover {
        background-color: ${({ token }) => token.colorFillTertiary};
      }
      .item-icon {
        width: 80px;
        height: 80px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid ${({ token }) => token.colorBorder};
        svg {
          width: 60px;
          height: 60px;
          fill: ${({ token }) => token.colorBorder};
        }
      }
      .item-values {
        flex: 1;
        .token-title {
          font-size: 16px;
          font-weight: 600;
        }
        .line-item {
          margin: 3px 0;
          display: flex;
          flex-direction: row;
          .line-item-name {
            width: 80px;
          }
          .line-item-value {
            flex: 1;
            word-break: break-all;
            width: 0;
            .btn-copy {
              margin-left: 6px;
            }
          }
        }
      }
      .item-btns {
        padding-right: 10px;
      }
    }
  }
`;
