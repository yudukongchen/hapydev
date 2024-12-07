import styled from '@emotion/styled';
import { GlobalToken } from 'antd';

export const ContextWrapper = styled.div<{ token: GlobalToken }>`
  width: 80px;
  background-color: ${({ token }) => token.colorBgElevated};
  box-shadow: ${({ token }) => token.boxShadow};
  border-radius: 8px;
  padding: 4px;
  .menu-item {
    height: 32px;
    padding: 0 10px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    cursor: pointer;
    .title {
      padding-left: 5px;
    }

    &.disabled {
      cursor: default !important;
      color: ${({ token }) => token.colorTextDisabled};
    }
    &:hover:not(&.disabled) {
      background-color: ${({ token }) => token.colorFillSecondary};
    }
  }
`;
