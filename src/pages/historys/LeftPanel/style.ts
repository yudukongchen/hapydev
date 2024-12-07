import styled from '@emotion/styled';
import { GlobalToken } from 'antd';

export const LeftWrapper = styled.div<{ token: GlobalToken }>`
  height: 100%;
  padding: 5px 6px;
  display: flex;
  flex-direction: column;
  background-color: ${({ token }) => token.colorBgContainer};
  border-left: 1px solid ${({ token }) => token.colorBorder};

  .method {
    font-size: 12px;
  }

  .tree-panel {
    margin: 10px 0 5px 0;
    flex: 1;
    .menu-tree-node {
      height: 30px;
      padding: 0 5px;
      display: flex;
      align-items: center;
      flex-direction: row;
      gap: 5px;
      cursor: pointer;
      &:hover {
        background-color: ${({ token }) => token.colorFillQuaternary};
      }

      &.tree-node-selected {
        background-color: ${({ token }) => token.colorFillTertiary};
      }

      .node-title {
        flex: 1;
        width: 0;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        .method {
          margin-right: 6px;
        }
        .length {
          margin-left: 6px;
          color: ${({ token }) => token.colorPrimary};
        }
      }
      .btns-item {
        visibility: hidden;
      }
      &:hover {
        .btns-item {
          visibility: visible;
        }
      }
    }
  }
`;
