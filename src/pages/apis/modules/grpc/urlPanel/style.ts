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
    .txt-method {
      height: 100%;
      width: 0;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      flex: 3;
      overflow: hidden;
      border: 1px solid var(--ant-color-border);
      text-overflow: ellipsis;
      cursor: text;
      .active-panel {
        display: flex;
        align-items: center;
        .ant-input-prefix {
          margin: 0 5px;
          display: flex;
          align-items: center;
        }
      }
      .service-name {
        // font-weight: bold;
        color: #1890ff;
      }
      .split-item {
        padding: 0 5px;
      }
    }
  }
  .api-btn {
    margin-left: 5px;
    &.cancel {
      background-color: ${({ token }) => token.colorWarningBgHover};
      color: ${({ token }) => token.colorWarningText};
      border-color: ${({ token }) => token.colorWarningBorderHover};
      &:hover {
        background-color: ${({ token }) => token.colorWarningBgHover};
        color: ${({ token }) => token.colorWarningText};
        border-color: ${({ token }) => token.colorWarningBorderHover};
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
    fill: var(--ant-color-success);
  }
  .method3 {
    fill: var(--ant-color-warning);
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
