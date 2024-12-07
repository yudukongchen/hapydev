import { css } from '@emotion/css';

export const infoPanelWrapper = css`
  padding: 5px;
  display: flex;
  align-items: center;

  .info-item {
    flex: 1;
    margin-left: 20px;
    display: inline-flex;
    flex-direction: column;
    .info-title {
      width: 100%;
      font-weight: 500;
      padding-bottom: 8px;
    }

    .txtbox-item {
      height: 32px;
      width: auto;
    }

    &:nth-of-type(1) {
      margin-left: 0;
      .info-title {
        padding-left: 0;
      }
    }
  }
`;
