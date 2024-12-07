import styled from '@emotion/styled';
import { GlobalToken } from 'antd';

export const SatusPanel = styled.div<{ token: GlobalToken }>`
  .status-table {
    width: 100%;
    border: 1px solid ${({ token }) => token.colorBorderSecondary};
    border-radius: 4px;
    td,
    th {
      border: 1px solid ${({ token }) => token.colorBorderSecondary};
      border-collapse: collapse;
    }
  }
  .status-header {
    width: 100%;
    display: flex;
    box-sizing: border-box;
    justify-content: space-between;
    padding: 12px;

    .svg-icon {
      width: 14px;
      height: 14px;
      margin-left: 6px;
    }
  }
  .status-item {
    height: 40px;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0 16px;

    .status-icon {
      width: 6px;
      height: 6px;
      background-color: red;
      border-radius: 50%;
    }
    .status-title {
      flex: 1;
      padding-left: 8px;
    }
  }
`;
