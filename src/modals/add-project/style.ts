import styled from '@emotion/styled';
import { GlobalToken } from 'antd';

export const AddProjectWrapper = styled.div<{ token: GlobalToken }>`
  display: flex;
  flex-direction: row;
  .left-panel {
    width: 190px;
  }
`;
