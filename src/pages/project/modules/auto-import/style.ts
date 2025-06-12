import styled from '@emotion/styled';
import { GlobalToken } from 'antd';

export const AutoImportWrapper = styled.div<{ token: GlobalToken }>`
  .case-title {
    margin-top: 20px;
    padding-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .title {
      font-size: 16px;
      font-weight: 500;
    }
    .slot-item {
      display: flex;
      align-items: center;
      gap: 5px;
    }
  }
`;
