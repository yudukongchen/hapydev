import styled from '@emotion/styled';
import { GlobalToken } from 'antd';

export const DataExportWrapper = styled.div<{ token: GlobalToken }>`
  .sec-title {
    padding: 10px 0;
  }

  .data-types {
    display: flex;
    flex-direction: row;
    gap: 15px;
    border-bottom: 1px solid ${({ token }) => token.colorBorderSecondary};
    padding: 15px 0;
    .type-item {
      width: 220px;
      height: 95px;
      border: 1px solid ${({ token }) => token.colorBorderSecondary};
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      border-radius: 5px;
      gap: 10px;
      cursor: pointer;
      &.active {
        font-weight: 600;
        border-color: ${({ token }) => token.colorPrimary};
        color: ${({ token }) => token.colorPrimary};
        position: relative;
        overflow: hidden;
        &::after {
          content: '';
          width: 50px;
          height: 50px;
          right: -30px;
          bottom: -30px;
          background-color: ${({ token }) => token.colorPrimary};
          position: absolute;
          transform: rotate(45deg);
        }
      }

      .item-icon {
        width: 30px;
        height: 30px;
        border-radius: 4px;
      }
      .item-text {
        text-align: center;
      }
    }
  }
  .version-panel {
    padding: 15px 0;
    border-bottom: 1px solid ${({ token }) => token.colorBorderSecondary};
  }
  .btns-panel {
    margin-top: 15px;
  }
`;
