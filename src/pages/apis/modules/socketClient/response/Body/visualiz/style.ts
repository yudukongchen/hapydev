import styled from '@emotion/styled';
import { GlobalToken } from 'antd';

export const VisualizWrapper = styled.div<{ token: GlobalToken }>`
  height: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;
  text-align: center;
  .empty-content {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    .btn-help {
      margin-top: 10px;
      background-color: ${({ token }) => token.colorInfoBg};
      color: ${({ token }) => token.colorInfoText};
      &:hover {
        background-color: ${({ token }) => token.colorInfoBgHover};
        color: ${({ token }) => token.colorInfoTextHover};
      }
    }
  }
`;
