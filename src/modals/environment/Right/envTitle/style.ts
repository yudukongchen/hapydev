import styled from '@emotion/styled';
import { GlobalToken } from 'antd';

export const ModifyIconWrapper = styled.div<{ token: GlobalToken }>`
  display: flex;
  flex-direction: row;
  .pleft {
    width: 40px;
    display: flex;
    justify-content: center;
    .env-title-icon {
      width: 20px;
      height: 20px;
      line-height: 20px;
      margin-top: 14px;
      font-size: 12px !important;
      border-radius: 2px;
      display: block;
      justify-content: center;
      align-items: center;
      text-align: center;
      white-space: nowrap;
    }
  }
  .pright {
    flex: 1;
    .case-title {
      height: 22px;
      padding: 10px 0;
      margin-top: 5px;
    }
    .case-value {
      width: 100%;
    }
    .case-colors {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
      gap: 12px;
      grid-gap: 12px;
      .color-item {
        height: 34px;
        border-radius: 3px;
        cursor: pointer;
        font-size: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        svg {
          width: 18px;
          height: 18px;
          fill: #ffffff;
        }
      }
    }
  }
`;
