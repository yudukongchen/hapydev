import { css } from '@emotion/css';
import styled from '@emotion/styled';
import { GlobalToken } from 'antd';

export const RegisterWrapper = styled.div<{ token: GlobalToken }>`
  height: 100vh;
  display: flex;
  align-items: center;
  background-color: #f5f7fa;
  flex-direction: column;
  font-size: 16px;
  color: #666666;

  .logo-panel {
    height: 50px;
    display: flex;
    margin-top: 10vh;
    flex-direction: row;
    align-items: center;
    .logo {
      height: 50px;
    }
    .name {
      padding-left: 10px;
      font-size: 24px;
      color: #666666;
    }
  }
  .brand-desc {
    padding: 20px 0 0 0;
    font-size: 14px;
    color: #666666;
  }
`;
