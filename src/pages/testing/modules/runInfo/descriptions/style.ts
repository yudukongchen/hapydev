import styled from '@emotion/styled';
import { GlobalToken } from 'antd';

export const DescriptionWrapper = styled.div<{ token: GlobalToken }>`
  margin-top: 10px;
  border-radius: 4px;
  padding: 10px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: 16px;
  gap: 16px;

  .desc-item {
    display: flex;
    flex-direction: row;
    gap: 8px;
    .desc-title {
      color: ${({ token }) => token.colorTextDescription};
    }
    .desc-value {
    }
  }
`;
