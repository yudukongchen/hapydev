import { css } from '@emotion/css';
import styled from '@emotion/styled';

export const BodyWrapper = styled.div`
  height: 100%;
  box-sizing: border-box;
  padding: 6px;
  display: flex;
  flex-direction: column;

  .body-headers {
    height: 26px;
  }
  .body-contents {
    flex: 1;
    margin-top: 3px;
    overflow: auto;
  }
`;

export const languageWrapper = css`
  width: 80px !important;
`;
