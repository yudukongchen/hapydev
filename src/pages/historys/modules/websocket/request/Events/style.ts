import { css } from '@emotion/css';

export const eventsWrapper = css`
  .case-title {
    height: 24px;
    box-sizing: content-box;
    padding: 10px 0;
    overflow: hidden;
  }

  .events-header {
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
  }

  .list-table {
    thead td {
      height: 33px;
      padding: 0 5px;
      background-color: transparent !important;
    }
  }
`;
