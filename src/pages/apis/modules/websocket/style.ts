import styled from '@emotion/styled';
import { GlobalToken } from 'antd';

export const WebsocketWrapper = styled.div<{ token: GlobalToken }>`
  height: 100%;
  display: flex;
  flex-direction: column;

  .scale-panel-wrapper {
    flex: 1;
    height: 0;
  }
`;
