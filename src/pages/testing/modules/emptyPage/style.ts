import styled from '@emotion/styled';
import { GlobalToken } from 'antd';

export const EmptyWrapper = styled.div<{ token: GlobalToken }>`
  flex: 1;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  color: ${({ token }) => token.colorTextDescription};
  .svg-icon {
    width: 50px;
    height: 50px;
    fill: currentColor;
    opacity: 0.3;
  }
  .empty-text {
    margin-top: 10px;
    padding-bottom: 50px;
  }
`;
