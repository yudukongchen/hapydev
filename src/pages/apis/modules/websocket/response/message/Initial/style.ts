import styled from '@emotion/styled';
import { GlobalToken } from 'antd';

export const InitialWrapper = styled.div<{ token: GlobalToken }>`
  flex: 1;
  display: flex;
  flex-direction: inherit;
  width: 100%;
  height: 100%;
  .panel-content {
    display: flex;
    flex-direction: column;
    flex: 1;
    min-width: 0;
    min-height: 0;
    align-items: center;
    justify-content: center;
    color: ${({ token }) => token.colorTextTertiary};
    &-svg {
      width: 60px;
      height: 60px;
      fill: ${({ token }) => token.colorTextTertiary};
    }
    &-text {
      padding-top: 10px;
    }
  }
`;
