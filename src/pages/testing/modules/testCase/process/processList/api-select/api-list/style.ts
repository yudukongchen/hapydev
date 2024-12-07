import styled from '@emotion/styled';
import { GlobalToken } from 'antd';

export const TreeWrapper = styled.div<{ token: GlobalToken }>`
  flex: 1;
  height: 0;
  overflow: auto;
  .ant-tree-treenode {
    width: 100%;
    padding: 4px 0;
    border-radius: 4px;
    display: flex;
    align-items: center;
    .ant-tree-node-content-wrapper {
      flex: 1;

      &:hover {
        background-color: transparent !important;
      }
    }
    &:hover {
      background-color: ${({ token }) => token.colorBorderSecondary};
    }
  }
`;
