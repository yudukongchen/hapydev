import { css } from '@emotion/css';

export const urlPanelWrapper = css`
  display: flex;
  flex-direction: row;
  gap: 10px;
  padding: 5px;

  .url-inputs {
    flex: 1;
    .txt-port {
      width: 30%;
    }
  }
`;
