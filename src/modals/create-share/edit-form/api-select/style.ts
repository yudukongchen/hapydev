import { css } from '@emotion/css';

export const treeWrapper = css`
  .ant-tree-treenode {
    width: 100%;
    .ant-tree-node-content-wrapper {
      flex: 1;

      &:hover {
        background-color: transparent !important;
      }
    }
  }
`;
