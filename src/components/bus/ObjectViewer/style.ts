import styled from '@emotion/styled';
import { GlobalToken } from 'antd';

export const ObjectViewWrapper = styled.div<{ token: GlobalToken }>`
  .key-item {
    padding-left: 17px;
    &.string {
      display: flex;
      flex-direction: row;
      gap: 10px;
      .string-key {
        font-weight: bold;
      }
      .string-value {
        flex: 1;
        color: ${({ token }) => token.colorInfoTextHover};
      }
    }
    &.object {
      display: flex;
      flex-direction: column;
      .object-key {
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 4px;
        svg {
          width: 12px;
          height: 12px;
          fill: currentColor;
        }
        &:hover {
          color: ${({ token }) => token.colorTextBase};
        }
      }
    }
  }
`;

export const StringViewWrapper = styled.div<{ token: GlobalToken }>`
  padding: 10px;
`;
