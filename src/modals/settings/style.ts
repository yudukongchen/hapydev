import styled from '@emotion/styled';
import { GlobalToken } from 'antd';

export const SettingsWrapper = styled.div<{ token: GlobalToken }>`
  height: 600px;
  display: flex;
  flex-direction: row;

  .right-container {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    padding: 10px;

    .right-title {
      padding: 10px 0 10px 20px;
      font-size: 16px;
      height: 30px;
    }

    .right-content {
      overflow: auto;
      flex: 1;
      padding: 0 20px;

      .case-item {
        border-bottom: 1px solid ${({ token }) => token.colorBorderSecondary};
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 20px 10px;
        overflow: hidden;
        .item-name {
          font-size: 14px;
          padding: 0 20px 0 8px;

          .item-name-desc {
            font-size: 12px;
            color: ${({ token }) => token.colorTextTertiary};
          }
        }
        .item-values {
          flex: 1;
          display: flex;
          justify-content: flex-end;
        }
      }
    }
  }
`;
