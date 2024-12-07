import styled from '@emotion/styled';
import { GlobalToken } from 'antd';

export const TestDatasWrapper = styled.div<{ token: GlobalToken }>`
  flex: 1;
  height: 0;
  padding: 10px;
  display: flex;
  flex-direction: column;

  .case-title {
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
