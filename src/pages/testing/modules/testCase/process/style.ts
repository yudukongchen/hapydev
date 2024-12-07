import styled from '@emotion/styled';
import { GlobalToken } from 'antd';

export const ProcessWrapper = styled.div<{ token: GlobalToken }>`
  flex: 1;
  height: 0;
  padding: 10px;
  display: flex;
  flex-direction: row;
  gap: 10px;
`;
