import styled from '@emotion/styled';
import { GlobalToken } from 'antd';

export const CustomWrapper = styled.div<{ token: GlobalToken }>`
  .ant-table-cell {
    padding: 7px 8px !important;
    word-break: break-all;
    vertical-align: middle;
  }
  .ant-table-thead {
    th {
      height: 34px;
      vertical-align: middle;
      color: ${({ token }) => token.colorText} !important;
    }
    .svg-wrapper {
      display: flex;
      align-items: center;
      gap: 5px;
    }
  }
`;
