import { css } from '@emotion/css';
import styled from '@emotion/styled';
import { GlobalToken } from 'antd';

export const leftWrapper = css`
  height: 100%;
  padding-top: 5px;
  display: flex;
  flex-direction: column;
`;

export const LeftWrapper = styled.div<{ token: GlobalToken }>`
  height: 100%;
  padding: 5px 6px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  background-color: ${({ token }) => token.colorBgContainer};
  border-left: 1px solid ${({ token }) => token.colorBorder};

  .tree-panel {
    flex: 1;
    display: flex;
  }
  .logo-item {
    width: 100%;
    user-select: none;
    height: 40px;
    background-color: ${({ token }) => token.colorFillQuaternary};
    color: ${({ token }) => token.colorTextDescription};
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
      color: ${({ token }) => token.colorText};
    }
  }
`;
