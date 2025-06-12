import styled from '@emotion/styled';
import { GlobalToken } from 'antd';

export const ApisWrapper = styled.div<{ token: GlobalToken }>`
  height: 500px;
  display: flex;
  flex-direction: row;
  gap: 10px;

  .right {
    width: 280px;
    padding-top: 5px;
    .case-item {
      margin-bottom: 15px;
      .item-title {
      }
      .item-cont {
        margin-top: 5px;
      }
    }
  }
`;
