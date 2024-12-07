import styled from '@emotion/styled';
import { GlobalToken } from 'antd';

export const ProxysWrapper = styled.div<{ token: GlobalToken }>`
  .cate-title {
    font-size: 14px;
    padding-left: 8px;
    font-weight: bold;
    &.mtop-20 {
      margin-top: 20px;
    }
  }
  .cate-title-desc {
    font-size: 12px;
    padding-left: 8px;
    color: ${({ token }) => token.colorTextTertiary};
  }

  .proxy-auth-panel {
    border-bottom: 1px solid ${({ token }) => token.colorBorderSecondary};
    padding: 10px 0;
    .auth-item {
      border-bottom: none !important;
      padding: 10px 10px !important;
    }
  }
`;
