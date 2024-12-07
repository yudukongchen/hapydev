import styled from '@emotion/styled';
import { GlobalToken } from 'antd';

export const LeftPanelWrapper = styled.div<{ token: GlobalToken }>`
  background-color: ${({ token }) => token.colorFillTertiary};
  padding: 20px;
  .left-title {
    height: 20px;
    padding: 10px 0;
    font-size: 14px;
    font-weight: bold;
  }
  .logo-panel {
    padding: 10px 0;
    .btn-upload {
      margin-left: 10px;
    }
  }
  .sec-title {
    padding: 10px 0;
  }
  .logo-list {
    .pic-item {
      width: 32px;
      height: 32px;
      margin: 3px;
      cursor: pointer;
      opacity: 0.3;
      &:hover {
        opacity: 1;
      }
      &.selected {
        opacity: 1;
        /* border: 2px solid ${({ token }) => token.colorPrimary}; */
        background-color: ${({ token }) => token.colorPrimary};
      }
    }
  }
`;
