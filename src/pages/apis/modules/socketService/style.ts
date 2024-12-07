import styled from '@emotion/styled';
import { GlobalToken } from 'antd';

export const SocketServiceWrapper = styled.div<{ token: GlobalToken }>`
  height: 100%;
  display: flex;
  flex-direction: column;

  .doc-panel {
    flex: 1;
    height: 0;
    padding: 0 5px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    .doc-title {
      height: 36px;
      padding-top: 10px;
      font-weight: bold;
    }
    .md-panel {
      flex: 1;
      height: 0;
      overflow: hidden;
    }
  }
`;
