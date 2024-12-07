import styled from '@emotion/styled';
import { GlobalToken } from 'antd';

export const TerminalWrapper = styled.div<{ token: GlobalToken }>`
  width: 100%;
  height: 100%;
  background-color: ${({ token }) => token.colorBgLayout};
  border-bottom: 1px solid ${({ token }) => token.colorBorder};
  display: flex;
  flex-direction: column;

  .title {
    height: 30px;
    overflow: hidden;
    padding: 0 5px;
    background-color: ${({ token }) => token.colorBgLayout};
    border-bottom: 1px solid ${({ token }) => token.colorBgContainer};
    display: flex;
    align-items: center;
    justify-content: space-between;
    .title-left {
      display: flex;
      align-items: center;
      svg {
        width: 14px;
        height: 14px;
      }
      span {
        padding-left: 5px;
      }
    }
    .title-right {
      .ant-btn {
        margin-left: 10px;
      }
    }
  }
  .terminal-container {
    flex: 1;
    overflow: hidden;
    background-color: ${({ token }) => token.colorBgLayout};
    margin: 0 5px;
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;
  }

  .xterm-viewport::-webkit-scrollbar {
    width: 10px;
    border-radius: 5px;
    border: 1px solid var(--ant-color-fill-quaternary);
    background-color: var(--ant-color-fill-tertiary);
  }

  .xterm-viewport::-webkit-scrollbar-track {
    margin: 1px;
    background: none;
  }

  .xterm-viewport::-webkit-scrollbar-thumb {
    border-radius: 8px;
    border-radius: 5px;
    background: var(--ant-color-fill);
  }
`;
