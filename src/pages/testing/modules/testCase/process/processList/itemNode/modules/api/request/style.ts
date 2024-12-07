import styled from '@emotion/styled';
import { GlobalToken } from 'antd';

export const RequestWrapper = styled.div<{ token: GlobalToken }>`
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .url-panel {
    width: 100%;
    box-sizing: border-box;
    display: flex;
    gap: 5px;
    .api-url-group {
      flex: 1;
    }
  }
  .request-container {
    margin-top: 10px;
    flex: 1;
    height: 0;
    overflow: hidden;
  }
  .footer-panel {
    margin: 0 5px;
    border-top: 1px solid ${({ token }) => token.colorBorderSecondary};
    padding-top: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .footer-left {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .btns-panel {
      display: flex;
      gap: 10px;
    }
  }
`;
