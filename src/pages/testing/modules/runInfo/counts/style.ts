import styled from '@emotion/styled';
import { GlobalToken } from 'antd';

export const CountsWrapper = styled.div<{ token: GlobalToken }>`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  gap: 10px;
  justify-content: space-between;
  .case-item {
    flex: 1;
    padding: 12px;
    border: 1px solid ${({ token }) => token.colorFillSecondary};
    border-radius: 4px;
    .title {
      font-size: 14px;
      color: ${({ token }) => token.colorTextDescription};
    }
    .count {
      margin-top: 12px;
      font-size: 20px;
    }
  }
`;
