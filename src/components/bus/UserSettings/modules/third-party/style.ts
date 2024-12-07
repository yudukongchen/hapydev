import styled from '@emotion/styled';
import { GlobalToken } from 'antd';

export const ThirdPartyWrapper = styled.div<{ token: GlobalToken }>`
  .case-item {
    display: flex;
    padding: 10px;
    border: 1px solid ${({ token }) => token.colorBorderSecondary};
    align-items: center;
    gap: 20px;
    border-radius: 5px;
    margin-bottom: 15px;

    .icon {
      width: 40px;
      height: 40px;
      border-radius: 5px;
    }
    .info {
      flex: 1;
      .title {
        display: flex;
        align-items: center;
        gap: 10px;
        .name {
          font-weight: 500;
        }
        .status {
          font-size: 12px;
          padding: 2px 5px;
          border-radius: 3px;
          color: ${({ token }) => token.colorErrorText};
          background-color: ${({ token }) => token.colorErrorBg};
        }
      }
      .desc {
        font-size: 12px;
        color: ${({ token }) => token.colorTextDescription};
      }
    }
  }
`;
