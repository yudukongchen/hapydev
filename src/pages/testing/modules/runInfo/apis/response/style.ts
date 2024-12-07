import styled from '@emotion/styled';
import { GlobalToken } from 'antd';

export const ResponseWrapper = styled.div<{ token: GlobalToken }>`
  color: ${({ token }) => token.colorText};
  height: 100%;
  overflow: auto;
  .url-panel {
    padding: 5px 0;
    line-height: 20px;
    word-break: break-all;
    word-wrap: break-word;
    span {
      &:not(&:first-of-type) {
        margin-left: 20px;
      }
    }
  }
  .status-panel {
    height: 20px;
    padding: 5px 0;
    display: flex;
    flex-direction: row;
    gap: 20px;
    span {
      color: #4caf50;
      margin-left: 5px;
    }
  }

  .case-item {
    .case-title {
      font-size: 14px;
      margin-top: 12px;
      font-weight: 600;
      padding: 2px 5px;
      border-left: 4px solid ${({ token }) => token.colorTextTertiary};
    }
    .content-wrapper {
      padding: 10px 0;
      word-break: break-all;
      word-wrap: break-word;
    }
  }
`;
