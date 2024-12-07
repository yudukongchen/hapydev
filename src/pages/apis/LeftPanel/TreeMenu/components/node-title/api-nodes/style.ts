import { css } from '@emotion/css';

export const nodeWarpper = css`
  display: inline-flex;
  flex: 1;
  align-items: center;

  .type-icon {
    display: inline-block;
    height: 20px;
    line-height: 20px;
    text-align: left;
    vertical-align: top;
    overflow: hidden;
    margin: 0 4px;
    & > svg {
      width: 16px;
      height: 16px;
      margin-top: 0.15em;
      fill: currentColor;
      overflow: hidden;
    }
    &.grpc {
      color: #1890ff;
    }
    &.socket {
      color: #1890ff;
    }
    &.websocket {
      color: #1890ff;
    }
  }
  .method {
    display: flex;
    font-size: 12px;
    font-weight: 700;
    margin: 0 4px;
    align-items: center;
    color: #9373ee;
    text-rendering: optimizelegibility;
  }

  .socket-client-icon {
    color: #ee46bc;
  }

  .node-title {
    white-space: nowrap;
    flex: 1;
    width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    display: block;
    align-items: center;
  }
  .status-icon {
    width: 14px;
    height: 28px;
    margin-right: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    dd {
      content: '';
      width: 6px;
      height: 6px;
      border-radius: 50%;
    }
  }
  .lock-item {
    margin-right: 5px;
  }
  .node-more {
    display: none;
  }
`;
