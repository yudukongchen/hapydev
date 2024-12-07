import { css } from '@emotion/css';

export const serverListWrapper = css`
  padding: 10px 0;
  box-sizing: border-box;
  width: 436px;
  height: 100%;
  overflow: auto;

  .big-title {
    height: 32px;
    padding-left: 10px;
    font-weight: bold;
  }

  .case-items {
    height: 32px;
    padding-left: 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    border-radius: 3px;

    &.active {
      //  color: var(--base-color-brand);
      // background-color: var(--highlight-background-color-tertiary);
    }
    &:not(&.active):hover {
      // background-color: var(--highlight-background-color-tertiary);
    }
  }
`;

export const triggerWrapper = css`
  width: 450px;
  height: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  // border: 1px solid var(--border-color-default);
  cursor: pointer;
  border-radius: 3px;

  .sel-title {
    padding-left: 10px;
    flex: 1;
  }
  .sel-more {
    width: 12px;
    height: 12px;
    margin-right: 10px;
    display: flex;
    align-items: center;
    svg {
      width: 12px;
      height: 12px;
      // fill: var(--content-color-fourth);
      transition: all cubic-bezier(0.075, 0.82, 0.165, 1) 0.2s;
    }
    &.open svg {
      transform: rotate(-180deg) !important;
    }
  }
`;
