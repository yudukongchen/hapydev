import { css } from '@emotion/css';
import styled from '@emotion/styled';
import { GlobalToken } from 'antd';

export const messageWrapper = css`
  height: 100%;

  .mini-message-bar {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    .bar-head {
      padding: 10px 0;
    }
    .bar-title {
      width: 12px;
      flex: 1;
    }
    &:hover {
      background-color: var(--ant-control-item-bg-hover);
    }
  }
`;

export const BodyListWarpper = styled.div<{ token: GlobalToken }>`
  height: 100%;
  display: flex;
  flex-direction: column;
  .body-headers {
    height: 30px;
    display: flex;
    flex-direction: row;
    align-items: center;
    border-bottom: 1px solid ${({ token }) => token.colorBorderSecondary};
    .header-title {
      flex: 1;
      overflow: hidden;
      padding: 0 5px;
      white-space: nowrap;
      color: ${({ token }) => token.colorTextBase};
    }
    .btns-panel {
      display: flex;
      gap: 5px;
      flex-direction: row;
      align-items: center;
    }
  }

  .list-panel {
    flex: 1;
    overflow: auto;
    margin: 5px 0;

    .list-item {
      height: 28px;
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 5px;
      .title {
        flex: 1;
        overflow: hidden;
        padding: 0 5px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        cursor: pointer;
      }
      .txt-box {
        flex: 1;
        border: none;
      }
      &.active,
      &:hover {
        background-color: ${({ token }) => token.colorFillTertiary};
      }
    }
  }
`;
