import { css } from '@emotion/css';

export const nodeWarpper = css`
  width: 100%;
  display: flex;
  white-space: nowrap;
  align-items: center;

  .type-icon {
    display: inline-block;
    width: 20px;
    height: 20px;
    line-height: 20px;
    text-align: left;
    vertical-align: top;
    overflow: hidden;
    margin-right: 4px;
    & > svg {
      width: 1.2em;
      height: 1.2em;
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
    &.socket_io {
      color: #1890ff;
    }
  }
  .method {
    width: 29px;
    font-size: 12px;
    font-weight: 700;
    margin-right: 8px;
    align-items: center;
    color: #9373ee;
    text-rendering: optimizelegibility;
  }

  .socket-client-icon {
    color: #ee46bc;
  }

  .node-title {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    display: block;
    align-items: center;
  }
  .more-item {
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }
`;
