import styled from '@emotion/styled';
import { GlobalToken } from 'antd';

export const DefinitionWrapper = styled.div<{ token: GlobalToken }>`
  height: 100%;
  display: flex;
  flex-direction: row;

  .left-panel {
    width: 300px;
    border-right: 1px solid ${({ token }) => token.colorBorderSecondary};
    padding: 10px 10px;
    overflow: auto;
    .type-panel {
      display: flex;
      align-items: center;
      justify-content: space-between;
      align-items: center;
    }
    .desc-panel {
      padding-top: 20px;
      font-size: 12px;
      color: ${({ token }) => token.colorTextDescription};
    }
    .btns-panel {
      padding-top: 20px;
      .ant-btn {
        display: flex;
        align-items: center;
      }
    }

    .imports-panel {
      .chouse-file {
        padding-top: 20px;
      }
      .import-modal {
        border: 1px solid ${({ token }) => token.colorBorder};
        background-color: ${({ token }) => token.colorFillTertiary};
        padding: 10px;
        border-radius: 4px;
        .import-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: relative;
          .ant-upload-wrapper {
            width: 100%;
          }
          .ant-checkbox-wrapper {
            position: absolute;
            right: 0;
            top: 0;
          }
          .ant-upload-list-item-name {
            word-break: break-all;
          }
        }
        .depends-item {
          padding-top: 10px;
        }
        .btns-item {
          padding-top: 20px;
          display: flex;
          gap: 10px;
        }
      }
      .fetch-modal {
        border: 1px solid ${({ token }) => token.colorBorder};
        background-color: ${({ token }) => token.colorFillTertiary};
        padding: 10px;
        border-radius: 4px;
        .depends-item {
          padding-top: 10px;
        }
        .btns-item {
          padding-top: 20px;
          display: flex;
          gap: 10px;
        }
      }
    }
  }
  .right-panel {
    flex: 1;
    overflow: hidden;
  }
`;
