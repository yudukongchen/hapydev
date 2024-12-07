import styled from '@emotion/styled';
import { GlobalToken } from 'antd';

export const SortLineWrapper = styled.div<{ token: GlobalToken }>`
  width: 100%;
  height: 9px;
  position: relative;
  &.is-over {
    &::after {
      content: '';
      width: 100%;
      height: 3px;
      position: absolute;
      left: 0;
      top: 3px;
      background-color: ${({ token }) => token.colorPrimary};
    }
  }
`;
