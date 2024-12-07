import styled from '@emotion/styled';
import { GlobalToken } from 'antd';

export const ExamplesWrapper = styled.div<{ token: GlobalToken }>`
  .example-item {
    border: 1px solid ${({ token }) => token.colorBorderSecondary};
    border-radius: 5px;
    .example-title {
      padding-left: 10px;
      font-size: 16px;
      font-weight: 600;
      margin-top: 10px;
    }
    .example-info {
      border-bottom: 1px solid ${({ token }) => token.colorBorderSecondary};
      padding: 10px;
      margin-top: 10px;
      gap: 20px;
      display: flex;
      flex-direction: row;
    }
    .item-content {
      display: flex;
      .item-title {
        border-bottom: 1px solid ${({ token }) => token.colorBorderSecondary};
        padding: 10px;
      }
      .schema-viewer {
        flex: 1;

        .viewer-content {
          padding: 5px 10px;
        }
      }
      .raw-panel {
        flex: 1;
        border-left: 1px solid ${({ token }) => token.colorBorderSecondary};
        word-break: break-all;
        .raw-content {
          padding: 10px;
        }
      }
    }
  }
`;
