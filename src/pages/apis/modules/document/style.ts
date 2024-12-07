import styled from '@emotion/styled';
import { GlobalToken } from 'antd';

export const DocumentWrapper = styled.div<{ token: GlobalToken }>`
  height: 100%;
  padding: 5px;
  display: flex;
  flex-direction: column;
  .doc-header {
    height: 40px;
    display: flex;
    flex-direction: row;
    gap: 5px;

    .head-left {
      flex: 1;
      .ant-input {
        border-width: 0;
        font-size: 14px;
        border-radius: 0;
        &:hover,
        &:active {
          border-bottom-width: 1px;
        }
      }
    }
  }
  .doc-container {
    flex: 1;
    height: 0;
    img {
      max-width: 100%;
    }
  }
`;
