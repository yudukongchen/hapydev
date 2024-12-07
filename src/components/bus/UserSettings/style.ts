import { css } from '@emotion/css';
import styled from '@emotion/styled';
import { GlobalToken } from 'antd';

export const UserSettingsWrapper = styled.div<{ token: GlobalToken }>`
  height: 500px;
  display: flex;
  flex-direction: row;
  .right-container {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    padding: 10px;
    .right-title {
      padding: 10px 0 10px 20px;
      font-size: 16px;
      height: 30px;
    }
    .right-content {
      overflow: auto;
      flex: 1;
      padding: 0 20px;
    }
  }
`;

export const modalWrapper = css`
  padding-bottom: 0;
  .ant-modal-content {
    padding: 0;
    overflow: hidden;
  }
`;
