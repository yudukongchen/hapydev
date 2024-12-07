import styled from '@emotion/styled';
import { GlobalToken } from 'antd';

export const ApiSelectWrapper = styled.div<{ token: GlobalToken }>`
  height: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  background-color: ${({ token }) => token.colorBgContainer};

  .check-panel {
    height: 30px;
    margin-top: 10px;
    .count {
      padding: 0 5px;
      color: ${({ token }) => token.colorPrimary};
    }
  }
`;

export const FooterWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  position: relative;
  align-items: center;
  gap: 5px;

  svg {
    width: 14px;
    height: 14px;
  }
`;
