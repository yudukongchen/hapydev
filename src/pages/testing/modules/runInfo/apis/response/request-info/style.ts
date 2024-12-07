import styled from '@emotion/styled';
import { GlobalToken } from 'antd';

export const RequestWrapper = styled.div<{ token: GlobalToken }>`
  .ant-table-container {
    border-radius: 0 !important;
  }
  .ant-table-cell {
    padding: 7px 10px !important;
    border-radius: 0 !important;
    vertical-align: middle;
  }

  .value-item {
    word-break: break-all;
  }
  p {
    word-break: break-all;
  }
`;
