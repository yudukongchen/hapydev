import styled from '@emotion/styled';
import { GlobalToken } from 'antd';

export const ChartsWrapper = styled.div<{ token: GlobalToken }>`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 5px 0;

  .char-title {
    font-size: 14px;
  }

  .dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #46d6a0;
    &.error {
      background-color: #fa97af;
    }
  }
`;
