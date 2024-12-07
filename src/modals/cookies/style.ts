import styled from '@emotion/styled';
import { GlobalToken } from 'antd';

export const CookiesWrapper = styled.div<{ token: GlobalToken }>`
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
    .containers-header {
      height: 40px;
      margin-top: 40px;
      padding: 0 8px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .header-title {
        height: 40px;
        display: flex;
        align-items: center;
        .title-span {
          padding-right: 15px;
          font-size: 14px;
        }
      }
      .btns-panel {
        .ant-btn {
          margin-left: 10px;
        }
      }
    }
    .right-content {
      flex: 1;
      height: 0;
      margin-top: 10px;
      padding: 0 8px;
      overflow: auto;

      .ant-table-thead {
        .ant-table-cell {
          border-radius: 0;
          background-color: ${({ token }) => token.colorBgLayout};
        }
      }
      .ant-table-content {
        .ant-table-cell {
          word-break: break-all;
        }
      }
    }
  }
`;
