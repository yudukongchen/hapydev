import styled from '@emotion/styled';
import { GlobalToken } from 'antd';

export const ScriptBoxWraper = styled.div<{ token: GlobalToken }>`
  width: 100%;
  height: 100%;
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
    padding: 12px 0;
    border-radius: 0;
    color: ${({ token }) => token.colorTextSecondary};
    border: 1px solid ${({ token }) => token.colorBorderSecondary};
    border-left: none;

    .panel-head {
      padding: 0 10px 10px 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: ${({ token }) => token.colorPrimary};
      font-size: 14px;
    }

    & .script-item {
      height: 32px;
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
    border: 1px solid ${({ token }) => token.colorBorderSecondary};
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
