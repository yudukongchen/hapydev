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
  display: flex;
  flex-direction: column;
  background-color: ${({ token }) => token.colorBgContainer};
  border-left: 1px solid ${({ token }) => token.colorBorder};
`;
