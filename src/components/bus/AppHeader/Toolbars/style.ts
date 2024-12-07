import styled from '@emotion/styled';
import { GlobalToken } from 'antd';

export const ToolbarsWrapper = styled.div<{ token: GlobalToken }>`
  display: flex;
  align-items: center;
  gap: 7px;
  .avator {
    //vertical-align: middle;
    cursor: pointer;
  }
`;
