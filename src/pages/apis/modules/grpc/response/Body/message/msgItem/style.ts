import styled from '@emotion/styled';
import { GlobalToken } from 'antd';

export const MsgItemWrapper = styled.div<{ token: GlobalToken }>`
  border-bottom: 1px solid ${({ token }) => token.colorBorderSecondary};
  .item-header {
    padding: 10px;
    display: flex;
    flex-direction: row;
    gap: 10px;
    border-radius: 4px;
    align-items: center;
    &:hover {
      background-color: ${({ token }) => token.colorFillQuaternary};
    }
    .item-icon {
      width: 16px;
      height: 16px;
      box-sizing: border-box;
      fill: var(--ant-color-text-base);
      &.connected {
        fill: var(--ant-color-success-text-hover);
      }
      &.disconnect {
        fill: var(--ant-color-error-text-hover);
      }
      &.sent {
        padding: 2px;
        background-color: var(--ant-color-warning-bg-hover);
      }
      &.received {
        padding: 2px;
        background-color: var(--ant-color-info-bg-hover);
      }
    }
    .item-title {
      flex: 1;
      width: 0;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .item-info {
      display: flex;
      align-items: center;
      flex-direction: row;
      gap: 5px;
    }
  }

  .editor-panel {
    height: 200px;
    border-top: 1px solid ${({ token }) => token.colorBorderSecondary};
    display: flex;
    flex-direction: column;
    .editor-header {
      padding: 5px 0;
    }
    .editor-cont {
      flex: 1;
    }
  }
`;
