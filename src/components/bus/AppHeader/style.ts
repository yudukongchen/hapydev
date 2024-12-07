import styled from '@emotion/styled';
import { GlobalToken } from 'antd';

export const HeaderWrapper = styled.div<{ token: GlobalToken }>`
  height: 40px;
  padding: 0 5px;
  border-bottom: 1px solid ${({ token }) => token.colorBorder};
  color: ${({ token }) => token.colorText};
  background-color: ${({ token }) => token.colorBgBase};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
