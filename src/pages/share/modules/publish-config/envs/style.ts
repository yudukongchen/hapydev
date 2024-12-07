import styled from '@emotion/styled';
import { GlobalToken } from 'antd';

export const EnvSelectWrapper = styled.div<{ token: GlobalToken }>`
  max-height: 300px;
  overflow: auto;
  padding-right: 10px;

  .env-item {
    padding: 5px 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    .btn {
      visibility: hidden;
      &.default {
        visibility: visible;
        background-color: ${({ token }) => token.colorWarningBg};
        color: ${({ token }) => token.colorWarningText};
      }
    }
    &:hover {
      .btn {
        visibility: visible;
      }
    }
  }
`;
