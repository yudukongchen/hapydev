import styled from '@emotion/styled';
import { GlobalToken } from 'antd';

export const ShareInfoWrapper = styled.div<{ token: GlobalToken }>`
  margin-top: 10px;
  .info-head {
    display: flex;
    flex-direction: row;
    align-items: center;
    .head-left {
      flex: 1;
      .head-desc {
        padding-top: 10px;
        span {
          padding-left: 5px;
          color: ${({ token }) => token.colorTextDescription};
        }
      }
    }
    .head-right {
      padding-right: 15px;
    }
  }
  .info-list {
    margin-top: 10px;
    .info-item {
      border-top: 1px solid ${({ token }) => token.colorBorderSecondary};
      padding: 8px;
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
  }
`;
