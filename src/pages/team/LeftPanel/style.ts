import styled from '@emotion/styled';
import { GlobalToken } from 'antd';

export const LeftWrapper = styled.div<{ token: GlobalToken }>`
  height: 100%;
  padding: 5px 6px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  background-color: ${({ token }) => token.colorBgContainer};
  border-left: 1px solid ${({ token }) => token.colorBorder};

  .big-title {
    padding: 15px 12px;
    height: 30px;
    font-size: 18px;
  }

  .empty-item {
    padding: 10px 0 10px 30px;
    color: ${({ token }) => token.colorTextTertiary};
  }

  .team-list-panel {
    flex: 1;
    overflow: auto;
    display: flex;
    flex-direction: column;
  }
  .cate-item {
    padding: 6px 10px;
    margin-top: 2px;
    display: flex;
    align-items: center;
    flex-direction: row;
    gap: 5px;
    .cate-icon {
      width: 16px;
      height: 16px;
      fill: currentColor;
    }
    .cate-title {
      flex: 1;

      .text {
      }
      .length {
        margin-left: 6px;
        color: ${({ token }) => token.colorPrimary};
      }
    }
    .more-item {
      padding-right: 6px;
      color: ${({ token }) => token.colorPrimary};
      cursor: pointer;
    }
  }
  .sec-item {
    margin: 2px 15px 0 15px;
    padding: 6px 15px;
    cursor: pointer;
    border-radius: 5px;
    &.active {
      color: ${({ token }) => token.colorTextBase};
      background-color: ${({ token }) => token.colorFillTertiary};
    }
    &:hover {
      background-color: ${({ token }) => token.colorFillTertiary};
    }
  }

  .btn-add {
    margin: 25px 15px;
    height: 36px;
  }
`;
