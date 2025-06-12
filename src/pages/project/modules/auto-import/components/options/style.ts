import styled from '@emotion/styled';
import { GlobalToken } from 'antd';

export const OptionsWrapper = styled.div<{ token: GlobalToken }>`
  border: 1px solid ${({ token }) => token.colorBorderSecondary};
  padding: 20px;
  border-radius: 10px;
  padding-top: 5px;
  .case-item {
    margin-bottom: 15px;
    .item-title {
    }
    .item-cont {
      margin-top: 5px;
    }
  }
`;
