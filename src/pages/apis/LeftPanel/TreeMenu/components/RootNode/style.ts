import styled from '@emotion/styled';
import { GlobalToken } from 'antd';

export const RootNodeWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  height: 30px;
  border-radius: 5px;
  align-items: center;
  cursor: pointer;
  padding: 0 5px;
  box-sizing: border-box;

  &:hover {
    background-color: ${({ token }: { token: GlobalToken }) => token.colorFillQuaternary};
  }

  .menu-tree-node-title {
    flex: unset;
    width: auto;
    padding: 0 5px;
    display: flex;
    align-items: center;
    flex-direction: row;
    border-radius: 0;
    .root-node-icon {
      width: 16px;
      height: 16px;
      fill: currentColor;
    }
    .root-node-title {
      margin-left: 5px;
    }
  }
  & > .menu-tree-node-indent {
    flex: 1;
    .foldbtn {
      width: 100%;

      svg {
        width: 12px;
        height: 12px;
        text-align: center;
        fill: currentColor;
      }
    }
  }
  .more-actions {
    display: none;
  }

  &:hover {
    .more-actions {
      display: flex;
    }
  }
  &.tree-node-selected {
    background-color: ${({ token }: { token: GlobalToken }) => token.colorFillTertiary};
  }
`;
