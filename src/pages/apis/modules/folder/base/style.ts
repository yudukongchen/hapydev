import styled from '@emotion/styled';
import { GlobalToken } from 'antd';

export const BaseWrapper = styled.div<{ token: GlobalToken }>`
  flex: 1;
  height: 0;
  padding: 0 5px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  .case-item {
    display: flex;
    margin: 10px 0;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    .item-name {
      width: 150px;
      text-align: right;
    }
    .item-cont {
      flex: 1;
    }
    .item-right {
      flex: 1;
      line-height: 22px;
    }
  }
  .tabs-container {
    flex: 1;
    height: 0;
    display: flex;
    flex-direction: column;
    & > .ant-tabs-content-holder {
      flex: 1;
      height: 0;
      overflow: hidden;
      position: relative;
      .ant-tabs-content {
        height: 100%;
        overflow: hidden;
        .ant-tabs-tabpane {
          height: 100%;
          overflow: auto;
        }
      }
    }
  }

  .auth-container {
    height: 100%;
    display: flex;
    flex-direction: column;
    .auth-notice {
      padding: 5px 5px;
      font-size: 14px;
      border-radius: 4px;
      color: ${({ token }) => token.colorWarningText};
      background-color: ${({ token }) => token.colorWarningBg};
    }

    .auth-box-panel {
      margin-top: 10px;
      flex: 1;
      height: 0;
    }
  }
`;
