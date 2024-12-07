import styled from '@emotion/styled';
import { GlobalToken } from 'antd';

export const DocsWrapper = styled.div<{ token: GlobalToken }>`
  flex: 1;
  height: 0;
  padding: 0 25px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
`;
