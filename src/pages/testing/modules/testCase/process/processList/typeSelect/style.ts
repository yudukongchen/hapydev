import styled from '@emotion/styled';
import { GlobalToken } from 'antd';

export const TypeSelectWrapper = styled.div<{ token: GlobalToken }>`
  width: 320px;
  background-color: ${({ token }) => token.colorBgElevated};
  box-shadow: ${({ token }) => token.boxShadow};
  border-radius: 8px;
  padding: 10px;
  .cate-name {
    font-size: 12px;
    padding: 5px 0;
  }
  .mtop10 {
    margin-top: 10px;
  }
  .case-item {
    height: 32px;
    flex: 1;
    display: flex;
    align-items: center;
    padding: 0 8px;
    border-radius: 4px;
    border: 1px solid ${({ token }) => token.colorBorderSecondary};
    cursor: pointer;
    &.disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }
    .title {
      padding-left: 5px;
    }
    &:hover {
      background-color: ${({ token }) => token.controlItemBgHover};
    }
    svg {
      width: 16px;
      height: 16px;
    }
    .http {
      fill: #52c41b;
    }

    .if {
      fill: #13c2c2;
    }
    .wait {
      fill: #9373ee;
    }
    .group {
      fill: #fa8c15;
    }
    .loop {
      fill: #1977ff;
    }
    .database {
      fill: #039e74;
    }
    .script {
      fill: #9a7d57;
    }
  }
  .column-wapper {
    display: flex;
    gap: 10px;
    flex-direction: row;
    margin-bottom: 10px;
  }
`;
