import styled from '@emotion/styled';
import { GlobalToken } from 'antd';

export const NoticeWrapper = styled.div<{ token: GlobalToken }>`
  background-color: ${({ token }) => token.colorBgElevated};
  box-shadow: ${({ token }) => token.boxShadowSecondary};
  border-radius: 8px;
  border: 1px solid ${({ token }) => token.colorBorderSecondary};
  width: 320px;
  box-sizing: border-box;
  padding: 10px;
  overflow: hidden;

  .todo-list,
  .info-list {
    max-height: 30vh;
    overflow: auto;
    .item {
      overflow: hidden;
      padding: 5px 8px;
      border-radius: 5px;
      //  border-bottom: 1px solid ${({ token }) => token.colorBorderSecondary};
      &:hover {
        background-color: ${({ token }) => token.colorFillSecondary};
      }
      .item-type {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .name {
          font-weight: 500;
        }
        .date {
          font-size: 12px;
        }
      }
      .item-desc {
        margin-top: 5px;
        font-size: 12px;
        word-break: break-all;
      }
    }
    .divider {
      margin: 5px 0;
      height: 1px;
      background-color: ${({ token }) => token.colorBorderSecondary};
    }
  }
`;
