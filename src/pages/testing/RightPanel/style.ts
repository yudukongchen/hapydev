import styled from '@emotion/styled';
import { GlobalToken } from 'antd';

export const RightPanelWrapper = styled.div<{ token: GlobalToken }>`
  height: 100%;
  display: flex;
  flex-direction: column;
  .resize-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    position: relative;
  }

  .request-container {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    display: flex;
    flex-direction: column;
    z-index: 1;
  }
  .console-container {
    position: relative;
    z-index: 102;
    background-color: ${({ token }) => token.colorBgLayout};
  }
`;
