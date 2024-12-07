import styled from '@emotion/styled';
import { GlobalToken } from 'antd';

export const StatusBarWrapper = styled.div<{ token: GlobalToken }>`
  height: 30px;
  padding: 0 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  background-color: ${({ token }) => token.colorBgElevated};
  .status-left,
  .status-right {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .ant-btn {
    display: flex;
    align-items: center;
    color: ${({ token }) => token.colorTextSecondary};
    .ant-btn-icon {
      margin-inline-end: 2px !important;
    }
  }
  .status-icon {
    width: 14px;
    height: 14px;
    fill: ${({ token }) => token.colorTextSecondary};
  }
`;
