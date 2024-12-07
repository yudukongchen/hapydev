import styled from '@emotion/styled';
import { GlobalToken } from 'antd';

export const UrlPanelWrapper = styled.div<{ token: GlobalToken }>`
  width: 100%;
  padding: 5px;
  box-sizing: border-box;
  display: flex;
  .api-url-group {
    flex: 1;
  }

  .api-btn {
    margin-left: 5px;
    &.cancel {
      background-color: ${({ token }) => token.colorWarningBgHover};
      color: ${({ token }) => token.colorWarningText};
      border-color: ${({ token }) => token.colorWarningBorderHover};
      &:hover {
        background-color: ${({ token }) => token.colorWarningBgHover};
        color: ${({ token }) => token.colorWarningText};
        border-color: ${({ token }) => token.colorWarningBorderHover};
      }
    }
  }
`;
