import styled from '@emotion/styled';
import { GlobalToken } from 'antd';

export const ApiWrapper = styled.div<{ token: GlobalToken }>`
  flex: 1;
  overflow: hidden;
  width: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;

  .link-type {
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    &.linked {
      svg {
        color: #52c41b;
      }
    }
    &.manual {
      svg {
        color: #ff4d4f;
      }
    }
  }

  .info-panel {
    flex: 1;
    display: flex;
    gap: 15px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    .disabled-api {
      color: ${({ token }) => token.colorErrorText};
    }
  }
`;
