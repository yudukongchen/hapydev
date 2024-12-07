import styled from '@emotion/styled';
import { GlobalToken } from 'antd';

export const ResizeBarWrapper = styled.div`
  flex-shrink: 0;
  z-index: 99;
  overflow: visible;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  .resize-bar {
    position: absolute;
    box-sizing: border-box;
    z-index: 100;
    background-color: ${({ token }: { token: GlobalToken }) => token.colorBorder};
  }

  &.horizontal {
    height: 100%;
    width: 14px;
    left: calc(50% - 7px);
    cursor: ew-resize !important;
    .resize-bar {
      width: 1px;
      height: 100%;
      cursor: ew-resize !important;
    }
  }
  &.vertical {
    width: 100%;
    height: 14px;
    top: calc(50% - 7px);
    cursor: ns-resize !important;
    .resize-bar {
      height: 1px;
      width: 100%;
      cursor: ns-resize !important;
    }
  }

  &:hover .resize-bar {
    background-color: ${({ token }: { token: GlobalToken }) => token.colorPrimary};
  }
`;
