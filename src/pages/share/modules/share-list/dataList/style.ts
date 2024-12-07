import styled from '@emotion/styled';
import { GlobalToken } from 'antd';

export const DataListWrapper = styled.div<{ token: GlobalToken }>`
  .info-item {
    display: flex;
    flex-direction: row;
    .status {
      width: 60px;
      color: ${({ token }) => token.colorPrimary};
      svg {
        color: currentColor;
        width: 16px;
        height: 16px;
        margin-right: 3px;
      }
      &.public {
        color: ${({ token }) => token.colorSuccess};
      }
    }
    .title {
      flex: 1;
    }
    .more {
      display: flex;
      align-items: center;
      .access-info {
        margin-right: 8px;
        color: ${({ token }) => token.colorTextDescription};
      }
    }
  }

  .data-item {
    white-space: nowrap;
  }

  .invalid {
    color: ${({ token }) => token.colorErrorText};
  }
  .forever {
    color: ${({ token }) => token.colorSuccessText};
  }
`;
