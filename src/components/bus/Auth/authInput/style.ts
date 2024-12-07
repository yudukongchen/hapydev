import { css } from '@emotion/css';

export const txtAreaWrapper = css`
  resize: none;
  overflow: hidden;
  overflow-y: auto;

  &::-webkit-scrollbar-corner {
    display: none;
  }
  &::-webkit-scrollbar-button {
    display: none;
  }
  &::-webkit-resizer {
    display: none;
  }
  &.small {
    height: 54px;
  }
  &.middle {
    height: 76px;
  }
  &.large {
    height: 98px;
  }
  &.largex {
    height: 120px;
  }
  &.largexx {
    height: 144px;
  }
  &.largexxx {
    height: 168px;
  }
`;
