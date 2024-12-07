import { css } from '@emotion/css';
import styled from '@emotion/styled';

export const menuIcon = css`
  width: 14px;
  height: 14px;
  fill: currentColor;
  &.primary {
    fill: var(--ant-color-primary);
  }
`;

export const QuickItem = styled.div`
  min-width: 150px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .desc {
    color: var(--ant-color-text-quaternary);
  }
`;
