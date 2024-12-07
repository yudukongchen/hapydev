import { css } from '@emotion/css';

export const defaultTabsWrapper = css`
  height: 100%;
  padding: 0 5px;
  & > .ant-tabs-nav {
    margin-bottom: 0;
    .ant-tabs-tab {
      margin-left: 0;
      padding-left: 10px;
      padding-right: 10px;
    }
  }
  & > .ant-tabs-content-holder {
    flex: 1;
    height: 0;
    & > .ant-tabs-content {
      height: 100%;
      & > .ant-tabs-tabpane {
        height: 100%;
        overflow: auto;
        &::-webkit-scrollbar {
          width: 10px;
          border-radius: 5px;
          background: none;
        }

        &::-webkit-scrollbar-track {
          margin: 1px;
          background: none;
        }

        &::-webkit-scrollbar-thumb {
          border-radius: 8px;
          background: none;
        }

        &:hover {
          &::-webkit-scrollbar {
            border: 1px solid var(--ant-color-fill-quaternary);
            background-color: var(--ant-color-fill-tertiary);
          }

          &::-webkit-scrollbar-track {
          }

          &::-webkit-scrollbar-thumb {
            border-radius: 5px;
            background: var(--ant-color-fill);
          }
        }
      }
    }
  }
`;
