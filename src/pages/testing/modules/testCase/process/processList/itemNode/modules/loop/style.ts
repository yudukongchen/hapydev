import styled from '@emotion/styled';
import { GlobalToken } from 'antd';

export const ForWrapper = styled.div<{ token: GlobalToken }>`
  flex: 1;
  height: 40px;
  overflow: hidden;
  width: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;

  .data-item {
    padding-right: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .max-len {
    max-width: 100px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;
