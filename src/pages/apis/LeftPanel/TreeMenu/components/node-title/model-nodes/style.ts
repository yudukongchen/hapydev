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
    &.model {
      color: #9373ee;
    }
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
  .node-more {
    display: none;
  }
`;
