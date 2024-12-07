import { css } from '@emotion/css';
import styled from '@emotion/styled';
import { GlobalToken } from 'antd';

export const UrlPanelWrapper = styled.div<{ token: GlobalToken }>`
  display: flex;
  flex-direction: row;
  gap: 10px;
  padding: 5px;

  .warning,
  .green {
    width: 14px;
    height: 14px;
    fill: currentColor;
  }
  .warning {
    color: var(--ant-color-warning-text);
  }
  .green {
    color: var(--ant-color-success-text);
  }

  .url-inputs {
    flex: 1;
    display: flex;
    .txt-url {
      flex: 2;
    }
    .txt_method {
      display: flex;
      align-items: center;
      flex: 3;
      border: 1px solid var(--ant-color-border);
      cursor: text;
      .service-name {
        // font-weight: bold;
        color: #1890ff;
      }
      .split-item {
        padding: 0 5px;
      }
    }
  }
`;

export const tlsTipsWrapper = css`
  color: var(--ant-color-text);
  .big-title {
    font-size: 14px;
    font-weight: bold;
  }
  .warning {
    color: var(--ant-color-warning-text);
  }
  .green {
    color: var(--ant-color-success-text);
  }
`;

export const methodIconWrapper = css`
  .method1 {
    fill: var(--ant-color-info);
  }
  .method2 {
    fill: var(--ant-color-warning);
  }
  .method3 {
    fill: var(--ant-color-success);
  }
  .method4 {
    fill: var(--ant-color-error);
  }
`;

export const dropdownWrapper = css`
  max-height: 300px;
  overflow: hidden;
  overflow-y: auto;
`;
