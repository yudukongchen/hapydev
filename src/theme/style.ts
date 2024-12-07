import styled from '@emotion/styled';
import { GlobalToken } from 'antd';

export const GlobalContainer = styled.div<{ token: GlobalToken }>`
  .beautify-scrollbar {
    &::-webkit-scrollbar {
      width: 10px;
      border-radius: 5px;
      background: var(--ant-color-bg-container);
    }

    &::-webkit-scrollbar-track {
      border-radius: 5px;
      background-color: var(--ant-color-fill-tertiary);
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 8px;
    }

    &:hover {
      &::-webkit-scrollbar {
      }

      &::-webkit-scrollbar-track {
        background-color: var(--ant-color-fill-secondary);
      }

      &::-webkit-scrollbar-thumb {
        border-radius: 5px;
        border: 1px solid var(--ant-color-fill-quaternary);
        background: var(--ant-color-fill);
      }
    }
  }
`;
