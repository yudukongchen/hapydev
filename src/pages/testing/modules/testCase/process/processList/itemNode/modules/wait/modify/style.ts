import styled from '@emotion/styled';
import { GlobalToken } from 'antd';

export const ModifyWrapper = styled.div<{ token: GlobalToken }>`
  width: 150px;
  background-color: ${({ token }) => token.colorBgElevated};
  box-shadow: ${({ token }) => token.boxShadowSecondary};
  border-radius: 8px;
  padding: 10px;
  background-clip: padding-box;
  outline: none;
  .big-type {
    padding: 5px 0;
    font-size: 16px;
    font-weight: 600;
    border-bottom: 1px solid ${({ token }) => token.colorBorderSecondary};
  }

  .form-item {
    margin-top: 5px;
    .item-title {
      width: 100%;
      height: 26px;
      padding-bottom: 3px;
      display: flex;
      align-items: center;
    }
    .item-value {
      width: 100%;
      margin-bottom: 10px;
    }
  }
`;
