import styled from '@emotion/styled';
import { GlobalToken } from 'antd';

export const SkinsWrapper = styled.div<{ token: GlobalToken }>`
  .theme-panel {
    width: auto;
    float: right;
    .theme-item {
      width: 64px;
      height: 48px;
      border: 1px solid transparent;
      margin: 8px;
      border-radius: 5px;
      cursor: pointer;
      overflow: hidden;
      position: relative;
      float: left;
      & .svg-item {
        width: 64px;
        height: 48px;
      }
      & .svg-selected {
        width: 12px;
        height: 12px;
        position: absolute;
        right: 3px;
        bottom: 3px;
        fill: ${({ token }) => token.colorWhite};
        background-color: ${({ token }) => token.colorPrimary};
        border-radius: 3px;
        padding: 2px;
      }

      &.active {
        border-color: ${({ token }) => token.colorPrimary};
      }
    }
  }
  .colors-panel {
    width: auto;
    float: right;
    .color-item {
      width: 32px;
      height: 32px;
      margin: 8px;
      border-radius: 50%;
      float: left;
      cursor: pointer;
      overflow: hidden;
      position: relative;
      .svg-selected {
        width: 16px;
        height: 16px;
        position: absolute;
        left: calc(50% - 8px);
        fill: ${({ token }) => token.colorWhite};
        top: calc(50% - 8px);
      }
      &:hover {
        opacity: 0.8;
      }
    }
  }
`;
