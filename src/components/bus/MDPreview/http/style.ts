import styled from '@emotion/styled';
import { GlobalToken } from 'antd';

export const HttpPreviewWrapper = styled.div<{ token: GlobalToken }>`
  flex: 1;
  overflow: auto;
  padding: 0 10px;

  .doc-name {
    .name {
      font-size: 32px;
      font-weight: 500;
      word-break: break-all;
    }
    .status {
      margin-left: 5px;
      padding: 0 5px;
      border-radius: 3px;
      display: inline-block;
      background-color: #00000033;
    }
  }
  .url-panel {
    padding: 5px 0;
    .url {
      margin-left: 5px;
      word-break: break-all;
    }
  }
  .info-panel {
    padding: 5px 0;
    div {
      margin-bottom: 5px;
    }
    .case-value {
      padding-right: 20px;
    }
  }

  .big-title {
    font-size: 24px;
    font-weight: 500;
    padding-top: 24px;
    padding-bottom: 8px;
  }

  .item-title {
    font-size: 14px;
    font-weight: 500;
    padding-bottom: 6px;
    .mode {
      margin-left: 5px;
      font-size: 12px;
      font-weight: normal;
      color: ${({ token }) => token.colorTextDescription};
    }
  }

  .request-panel {
    .request-item {
      margin-bottom: 15px;

      .binary {
        color: ${({ token }) => token.colorTextDescription};
      }
    }
  }
  .request-none {
    span {
      color: ${({ token }) => token.colorTextDescription};
    }
  }

  .preview-table {
    thead td {
      font-weight: 600;
      background-color: ${({ token }) => token.colorFillSecondary};
    }
    td {
      padding: 8px 10px;
    }
  }
`;
