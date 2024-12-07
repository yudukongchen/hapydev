import styled from '@emotion/styled';
import { GlobalToken } from 'antd';

export const EnvironmentWrapper = styled.div<{ token: GlobalToken }>`
  height: 600px;
  display: flex;
  flex-direction: row;
`;
