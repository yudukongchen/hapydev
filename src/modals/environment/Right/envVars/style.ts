import styled from '@emotion/styled';
import { GlobalToken } from 'antd';

export const EnvVarsWrapper = styled.div<{ token: GlobalToken }>`
  thead td {
    height: 33px;
    padding: 0 5px;
    background-color: transparent !important;
  }
  tbody td {
    height: 33px;
    background-color: transparent !important;
  }
  .span-icon {
    margin-left: 5px;
  }
`;
