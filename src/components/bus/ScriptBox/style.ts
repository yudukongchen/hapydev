import styled from '@emotion/styled';
import { GlobalToken } from 'antd';

export const ScriptBoxWraper = styled.div<{ token: GlobalToken }>`
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;

  .scale-item-content {
    height: 100%;
  }

  .editor-panel {
    flex: 1;
    overflow: hidden;
  }

  .helper-panel {
    width: 240px;
    height: 100%;
    overflow: hidden;
    overflow-y: auto;
    padding-bottom: 5px;
    border-radius: 0;
    color: ${({ token }) => token.colorTextSecondary};
    border-right: 1px solid ${({ token }) => token.colorBorderSecondary};
    border-left: none;
    display: flex;
    flex-direction: column;

    .panel-head {
      padding: 5px 5px 5px 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: ${({ token }) => token.colorPrimary};
      font-size: 14px;
    }
    .panel-list {
      flex: 1;
      height: 0;
      overflow: hidden;
      overflow-y: auto;
    }

    & .script-item {
      height: 32px;
      //  font-size: var(--size-12px);
      display: flex;
      align-items: center;
      border-radius: 0;
      justify-content: space-between;
      width: 100%;
      white-space: nowrap;
      text-overflow: ellipsis;
      padding: 0 16px;
      border-left: 5px solid transparent;
      cursor: pointer;

      &:hover {
        color: ${({ token }) => token.colorPrimary};
        background-color: ${({ token }) => token.colorFillTertiary};
        border-left: 5px solid ${({ token }) => token.colorPrimary};
      }
    }
  }
  .helper-bar-mini {
    width: 30px;
    cursor: pointer;
    border-right: 1px solid ${({ token }) => token.colorBorderSecondary};
    border-left: none;
    font-size: 14px;
    padding-top: 10px;
    writing-mode: vertical-rl;
    letter-spacing: 5px;
    span {
      margin-top: 10px;
    }
    &:hover {
      background-color: ${({ token }) => token.controlItemBgHover};
    }
  }
`;
