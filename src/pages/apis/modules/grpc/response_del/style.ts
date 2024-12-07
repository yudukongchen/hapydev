import { css } from '@emotion/css';
import styled from '@emotion/styled';
import { GlobalToken } from 'antd';

export const ResponseWrapper = styled.div<{ token: GlobalToken }>`
  height: 100%;
  padding: 0 5px;
  display: flex;
  flex-direction: column;
  position: relative;
`;
