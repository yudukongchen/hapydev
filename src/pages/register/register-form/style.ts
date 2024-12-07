import styled from '@emotion/styled';
import { GlobalToken } from 'antd';

export const RegisterForm = styled.div<{ token: GlobalToken }>`
  margin-top: 15px;
  border-radius: 10px;
  width: 400px;
  box-sizing: border-box;
  padding: 20px 40px;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;

  .link {
    color: #9373ee;
  }
  .txtbox {
    width: 100%;
    margin-top: 20px;
  }
  .reg-button {
    margin-top: 20px;
    width: 100%;
  }
  .desc-item {
    font-size: 14px;
    margin-top: 20px;
    display: flex;
    align-items: center;
    .span {
      padding: 0 5px;
    }
  }
  .more-items {
    font-size: 14px;
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
  }
`;
