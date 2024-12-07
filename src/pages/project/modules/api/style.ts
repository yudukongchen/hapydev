import styled from '@emotion/styled';
import { GlobalToken } from 'antd';

export const StatusWrapper = styled.div<{ token: GlobalToken }>`
  .case-title {
    margin-top: 20px;
    padding-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .left {
      flex: 1;
      .title {
        font-size: 16px;
        font-weight: 500;
      }
      .desc {
        margin-left: 6px;
        color: ${({ token }) => token.colorTextDescription};
      }
    }
    .slot-item {
      display: flex;
      align-items: center;
      gap: 5px;
    }
  }
`;
