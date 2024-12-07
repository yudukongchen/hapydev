import styled from '@emotion/styled';
import { GlobalToken } from 'antd';

export const EditFormWrapper = styled.div<{ token: GlobalToken }>`
  .form-item {
    padding: 10px 0;
    min-height: 32px;
    display: flex;
    flex-direction: row;
    align-items: center;

    .item-name {
      width: 130px;
      font-weight: 500;
    }
    .item-value {
      .ant-radio-wrapper:last-child {
        margin-right: 0;
      }
      .label-item {
        cursor: pointer;
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 10px;
      }
    }
  }

  .base-panel {
    padding: 10px 15px;
    .item-value {
      flex: 1;
    }
  }
  .config-panel {
    padding: 10px 15px;
    border-radius: 5px;
    border: 1px solid ${({ token }) => token.colorBorderSecondary};
    .form-item {
      justify-content: space-between;
      &:not(:last-child) {
        border-bottom: 1px solid ${({ token }) => token.colorBorderSecondary};
      }
    }
  }
`;
