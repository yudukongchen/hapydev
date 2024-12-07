import styled from '@emotion/styled';
import { GlobalToken } from 'antd';

export const FolderWrapper = styled.div<{ token: GlobalToken }>`
  height: 100%;
  display: flex;
  flex-direction: column;
  .heads-panel {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 5px;
    gap: 10px;
    .view-modes {
    }
    .inputs {
      flex: 1;
    }
  }
`;
