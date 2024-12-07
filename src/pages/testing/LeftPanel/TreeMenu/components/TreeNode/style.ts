import styled from '@emotion/styled';
import { GlobalToken } from 'antd';

export const TreeNodeWrapper = styled.div`
  height: 30px;
  width: 100%;
  cursor: pointer;

  .root-node-icon {
    width: 16px;
    height: 16px;
    fill: currentColor;
  }
  .root-node-title {
    margin-left: 5px;
  }

  .type-icon {
    width: 16px;
    height: 16px;
    fill: currentColor;
    display: flex;
    align-items: center;
    svg {
      width: 16px;
      height: 16px;
    }
    &.test_case {
      color: ${({ token }) => token.colorPrimary};
    }
  }

  .node-more {
    visibility: hidden;
  }
  &:hover {
    .node-more {
      visibility: visible;
    }
  }

  .tree-node-inner {
    flex: 1;
    height: 30px;
    // padding: 0 5px;
    display: flex;
    align-items: center;
    flex-direction: row;
    border-radius: 0;
    position: relative;
  }

  &.tree-node-selected {
    background-color: ${({ token }: { token: GlobalToken }) => token.colorFillTertiary};
  }

  .insert-line {
    width: 100%;
    height: 10px;
    position: absolute;
    left: 0;
    top: 0;
    &.is-over {
      &::after {
        content: '';
        width: 100%;
        height: 1px;
        position: absolute;
        left: 0;
        top: 1px;
        background-color: ${({ token }) => token.colorPrimary};
      }
    }
  }

  .append-line {
    width: 100%;
    height: 10px;
    position: absolute;
    left: 0;
    bottom: 0;
    &.is-over {
      &::after {
        content: '';
        width: 100%;
        height: 1px;
        position: absolute;
        left: 0;
        bottom: 1px;
        background-color: ${({ token }) => token.colorPrimary};
      }
    }
  }

  .leaf-item,
  .folder-item,
  .draging-item {
    width: 100%;
    height: 30px;
    padding: 0 5px;
    border-radius: 3px;
    box-sizing: border-box;
    position: relative;
    display: flex;
    flex-direction: row;
    align-content: center;
    &:hover {
      background-color: ${({ token }: { token: GlobalToken }) => token.colorFillQuaternary};
    }
    &.draging {
      opacity: 0.2;
    }
  }
  .folder-item {
    &.is-over {
      background-color: ${({ token }) => token.colorPrimary};
    }
  }
  .draging-item {
    background-color: ${({ token }: { token: GlobalToken }) => token.colorFillSecondary};
  }
`;
