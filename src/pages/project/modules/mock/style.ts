import styled from '@emotion/styled';
import { GlobalToken } from 'antd';

export const MockPanelWrapper = styled.div<{ token: GlobalToken }>`
  .case-title {
    margin-top: 20px;
    padding-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .title {
      font-size: 16px;
      font-weight: 500;
    }
    .slot-item {
      display: flex;
      align-items: center;
      gap: 5px;
    }
  }

  .base-panel {
    border: 1px solid ${({ token }) => token.colorBorderSecondary};
    padding: 0 20px;
    border-radius: 4px;

    .case-item {
      display: flex;
      align-items: center;
      padding: 20px 10px;
      border-bottom: 1px solid ${({ token }) => token.colorBorderSecondary};
      &:last-child {
        border-bottom: none;
      }
      .case-name {
        width: 160px;
        font-size: 14px;
        font-weight: 500;
      }
      .case-value {
        flex: 1;

        .desc-value {
          padding-top: 10px;
          color: ${({ token }) => token.colorTextDescription};
        }
      }
    }
  }
`;
