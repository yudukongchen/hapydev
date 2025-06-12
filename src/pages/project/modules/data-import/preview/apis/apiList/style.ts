import styled from '@emotion/styled';
import { GlobalToken } from 'antd';

export const ApiListWrapper = styled.div<{ token: GlobalToken }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  .select-all-header {
    height: 30px;
  }

  .tree-list-panel {
    height: 470px;
    overflow: auto;
    border: 1px solid ${({ token }) => token.colorBorderSecondary};
    border-radius: 5px;
    overflow: auto;
    padding: 5px 3px;
    display: flex;
    flex-direction: column;

    .ant-tree {
      background: transparent;
    }
    .ant-tree-treenode {
      width: calc(100% - 15px);
      margin-right: 6px;
      margin-left: 6px;
      box-sizing: content-box;
      align-items: center;
      &:hover {
        background: ${({ token }) => token.controlItemBgHover};
      }
      .ant-tree-indent-unit {
        width: 12px;
      }
      .ant-tree-node-content-wrapper {
        flex: 1;
        .ant-tree-title {
          display: flex;
          align-items: center;

          svg {
            width: 16px;
            height: 16px;
            margin-right: 10px;
          }
          .method {
            padding-right: 10px;
          }
          .name {
            white-space: nowrap;
          }
          .url {
            flex: 1;
            width: 0;
            padding-left: 10px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            color: ${({ token }) => token.colorTextQuaternary};
          }
        }
        &:hover {
          background: none !important;
        }
      }
    }
  }
`;
