import styled from '@emotion/styled';
import { GlobalToken } from 'antd';

export const LeftWrapper = styled.div<{ token: GlobalToken }>`
  height: 100%;
  padding: 5px 6px;
  display: flex;
  flex-direction: column;
  background-color: ${({ token }) => token.colorBgContainer};
  border-left: 1px solid ${({ token }) => token.colorBorder};

  .ant-menu-root {
    border-inline-end: none !important;

    .menu-icon {
      width: 16px;
      height: 16px;
      fill: currentColor;
    }

    [role='menuitem'] {
      height: 32px;
      &:active {
        background-color: ${({ token }) => token.colorFillTertiary} !important;
      }
    }

    .ant-menu-item-selected {
      color: ${({ token }) => token.colorTextBase};
      background-color: ${({ token }) => token.colorFillTertiary};
    }
    .ant-menu-sub {
      background: none !important;
    }
  }
`;
