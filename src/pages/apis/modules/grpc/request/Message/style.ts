import styled from '@emotion/styled';
import { GlobalToken } from 'antd';

export const RawPanelWrapper = styled.div<{ token: GlobalToken }>`
  height: 100%;
  padding-right: 5px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  .editor-panel {
    height: 0;
    flex: 1;
  }
  .tools-panel {
    margin-bottom: 5px;
    height: 28px;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 5px;
    .left {
      flex: 1;
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 5px;
    }
    .right {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 5px;
    }
  }
`;
