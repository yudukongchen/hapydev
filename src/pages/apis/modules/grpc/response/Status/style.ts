import { css } from '@emotion/css';
import styled from '@emotion/styled';
import { GlobalToken } from 'antd';

export const StatusWrapper = styled.div<{ token: GlobalToken }>`
  display: flex;
  align-content: center;

  .status-item {
    margin-left: 10px;
    display: flex;
    align-items: center;
    span {
      padding: 0 3px;
    }
  }
  .status-icon {
    width: 16px;
    height: 16px;
    cursor: pointer;
    fill: ${({ token }) => token.colorText};
  }
  .green {
    color: ${({ token }) => token.colorSuccess};
    fill: ${({ token }) => token.green};
  }
`;

export const netWorkWrapper = css`
  .network-item {
    margin: 5px 0;
    .case-name {
      padding-right: 10px;
    }
  }
`;

export const timeWrapper = css`
  .time-item {
    margin: 5px 0;
    display: flex;
    .case-name {
      min-width: 65px;
      display: inline-flex;
    }
  }
`;
