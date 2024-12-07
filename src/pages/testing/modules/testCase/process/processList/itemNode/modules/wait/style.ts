import styled from '@emotion/styled';
import { GlobalToken } from 'antd';

export const WaitWrapper = styled.div<{ token: GlobalToken }>`
  flex: 1;
  overflow: hidden;
  width: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
`;
