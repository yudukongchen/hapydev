import { css } from '@emotion/css';
import styled from '@emotion/styled';
import { GlobalToken } from 'antd';

export const LoginWrapper = styled.div<{ token: GlobalToken }>`
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .from-item {
    padding: 8px 0;
    & .ant-space-compact {
      width: 100%;
    }
  }
  .login-btn {
    margin: 5px 0;
  }
  .label-item {
    padding: 5px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .more-item {
    margin-top: 5px;
    padding-top: 8px;
    display: flex;
    align-items: center;
    border-top: 1px solid ${({ token }) => token.colorBorderSecondary};
    .ant-btn {
      padding: 0;
    }
  }
`;
