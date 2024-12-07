import { css } from '@emotion/css';

export const statusWrapper = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  white-space: nowrap;
  gap: 5px;
  cursor: pointer;
  .status-icon {
    width: 8px;
    height: 8px;
    border-radius: 50%;
  }
`;

export const optionItem = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
  .status-icon {
    width: 8px;
    height: 8px;
    border-radius: 50%;
  }
`;
