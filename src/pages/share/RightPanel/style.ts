import styled from '@emotion/styled';
import { GlobalToken } from 'antd';

export const RightPanelWrapper = styled.div<{ token: GlobalToken }>`
  height: 100%;
  display: flex;
  flex-direction: column;
  .right-container {
    padding: 0 10px;
    flex: 1;
    display: flex;
    flex-direction: column;
    position: relative;
    border-bottom: 1px solid ${({ token }) => token.colorBorder};

    .panel-header {
      height: 40px;
      margin-top: 20px;
      padding: 10px 0;
      font-size: 24px;
      box-sizing: content-box;
      border-bottom: 1px solid ${({ token }) => token.colorBorderSecondary};
    }
  }
`;
