import styled from "@emotion/styled";
import { css } from "@emotion/css";
import { GlobalToken } from "antd";

export const BtnSortWrapper = styled.div<{ token: GlobalToken }>`
  height: 32px;
  cursor: row-resize;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ token }) => token.colorIcon};

  /* svg {
    fill: var(--content-color-secondary);
  } */
`;

export const dataSorttingWrapper = css`
  z-index: 99999;
  // background-color: var(--background-color-tertiary);

  td {
    text-align: center;
    align-items: center;
    // border: 1px solid var(--border-color-default);
    vertical-align: middle;
  }
`;

export const SortTableWrapper = styled.div<{ token: GlobalToken }>`
  table {
  }
`;
