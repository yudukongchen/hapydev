import styled from '@emotion/styled';
import { GlobalToken } from 'antd';

export const CertificatesWrapper = styled.div<{ token: GlobalToken }>`
  .pem-item {
    padding-top: 10px;
    overflow: hidden;
  }

  .modify-footer {
    padding-top: 20px;
    display: flex;
    justify-content: flex-end;
    padding-right: 20px;
    .ant-btn {
      margin-left: 15px;
    }
  }
  .cert-list-panel {
    margin-top: 15px;
    padding: 0 8px;
    .cert-item {
      display: flex;
      margin: 10px 0;
      padding: 5px 0;
      flex-direction: row;
      align-items: center;
      border-bottom: 1px solid ${({ token }) => token.colorBorderSecondary};
      .cert-item-name {
        flex: 1;
      }
      .cert-item-action {
        .ant-btn {
          margin-left: 5px;
        }
      }
    }
  }
`;
