import { css } from '@emotion/css';

export const methodsWrapper = css`
  .method {
    font-weight: 700;
    &.GET {
      color: #4caf50;
    }
    &.POST {
      color: #ffb400;
    }
    &.PUT {
      color: #1890ff;
    }
    &.DELETE {
      color: #fa541c;
    }
    &.HEAD {
      color: #1890ff;
    }
    &.PATCH {
      color: #fa541c;
    }
    &.TRACE {
      color: #2f54eb;
    }
    &.OPTIONS {
      color: #1890ff;
    }
    &.PURGE {
      color: #9373ee;
    }
    &.socket_client {
      color: #1890ff;
    }
  }

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
  }
`;
