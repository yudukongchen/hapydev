import styled from '@emotion/styled';
import { GlobalToken } from 'antd';

export const MessageWrapper = styled.div<{ token: GlobalToken }>`
  height: 100%;
  padding: 0 5px;
  display: flex;
  flex-direction: column;
  position: relative;

  .message-list {
    flex: 1;
    overflow: auto;
  }
`;
