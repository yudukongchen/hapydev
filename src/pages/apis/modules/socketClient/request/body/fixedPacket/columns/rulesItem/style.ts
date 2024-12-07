import { css } from '@emotion/css';

export const rulesWrapper = css`
  display: flex;
  align-items: center;
  padding: 0 5px;

  .span-panel {
    flex: 1;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .ant-btn {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const popWrapper = css`
  width: 250px;
  font-size: 12px;
  .main-title {
    font-size: 12px;
  }
  .big-title {
    font-weight: bold;
    overflow: hidden;
    margin: 10px 0;
  }
  label {
    font-size: 12px;
  }
  .form-footer {
    padding: 8px;
    display: flex;
    justify-content: flex-end;
    .ant-btn {
      margin-left: 5px;
    }
  }
`;

export const headersWrapper = css`
  padding: 0 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .ant-btn span {
    font-weight: normal;
  }
`;
