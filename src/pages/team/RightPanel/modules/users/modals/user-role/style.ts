import styled from '@emotion/styled';
import { GlobalToken } from 'antd';

export const RolePanelWrapper = styled.div<{ token: GlobalToken }>`
  .form-item {
    width: 100%;
    margin: 5px 0;
    display: flex;
    flex-direction: column;
    .case-title {
      margin-top: 5px;
      font-weight: 500;
    }
    .case-item {
      margin-top: 5px;
    }
  }
`;
