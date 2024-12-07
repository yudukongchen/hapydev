import styled from '@emotion/styled';
import { css } from '@emotion/css';
import { GlobalToken } from 'antd';

export const ResponseWrapper = styled.div<{ token: GlobalToken }>`
  height: 100%;
  width: 100%;
  min-width: 550px;
  overflow-x: hidden;
  position: relative;
`;
