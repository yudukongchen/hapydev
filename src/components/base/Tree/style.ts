import styled from '@emotion/styled';
import { GlobalToken } from 'antd';

export const TreeWrapper = styled.div<{ token: GlobalToken }>`
  .menu-tree {
    text-align: left;
    //color: @text-color;

    &-node {
      display: flex;
      justify-content: flex-start;
      height: 30px;
      border-radius: 5px;
      // color:@text-color;
      align-items: center;
      box-sizing: border-box;

      .tree-node-checkbox {
        width: 14px;
        height: 14px;
        margin-left: 10px;
      }

      &-icon {
        display: flex;
        align-items: center;
        width: 12px;
        height: 12px;
        margin: 0 3px;
      }

      &-indent {
        height: 100%;
        min-width: 16px;
        display: flex;
        align-items: center;

        &-unit {
          width: 15px;
          display: block;
          float: left;
        }
      }

      &-notleaf {
        width: 16px;
        height: 16px;
        display: flex;
        justify-content: center;
        align-items: center;

        & .foldbtn {
          width: 16px;
          height: 16px;
          cursor: pointer;
          border-radius: 3px;
          display: flex;
          justify-content: center;
          align-items: center;
          text-align: center;

          & svg {
            width: 12px;
            height: 12px;
            text-align: center;
            fill: currentColor;
          }
        }
      }

      &-line {
        width: 16px;
        height: 100%;
        display: block;
        position: relative;
        &::after {
          content: '';
          height: 100%;
          width: 1px;
          display: block;
          position: absolute;
          border-right: 1px solid  transparent
          position: absolute;
          right: 50%;
        }
      }

      &-end {
        width: 18px;
        height: 100%;
        fill: #00000055;
      }

      &-title {
        flex: 1;
        width: 0;
        padding-left: 5px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      &-more {
        width: 24px;
        height: 24px;
        justify-content: center;
        align-items: center;
        background: #e9e9e9;
        border-radius: 3px;
        display: none;
        cursor: pointer;

        & > svg {
          width: 12px;
        }
      }

      &:hover &-more {
        display: flex;
      }

    }

    .tree-node-list {
      height: 100%;
    }
  }
`;
