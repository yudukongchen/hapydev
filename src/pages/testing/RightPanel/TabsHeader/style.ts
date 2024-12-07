import styled from '@emotion/styled';
import { GlobalToken } from 'antd';

export const TabsHeaderWrapper = styled.div<{ token: GlobalToken }>`
  padding: 0 5px;
  height: 38px;
  background-color: ${({ token }) => token.colorFillTertiary};
  display: flex;
  .item-list {
    flex: 0 1 auto;
  }
  .add-item {
    flex: 1 0 auto;
  }
  .slot-item {
    width: auto;
  }
`;
