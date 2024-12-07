import styled from '@emotion/styled';
import { GlobalToken } from 'antd';

export const SendErrorWrapper = styled.div<{ token: GlobalToken }>`
  width: 100%;
  height: 100%;
  // position: relative;
  position: absolute;
  left: 0;
  top: 0;
  background: ${({ token }) => token.colorBgBase};
  z-index: 101;
  .btn-close-error {
    position: absolute;
    right: 16px;
    top: 14px;
    cursor: pointer;
  }
  .container {
    text-align: center;
    position: absolute;
    left: 50%;
    top: 50%;
    width: 90%;
    transform: translate(-50%, -50%);
    color: ${({ token }) => token.colorTextTertiary};
    p.error_str {
      width: max-content;
      margin: 10px auto;
      color: ${({ token }) => token.colorError};
      background: ${({ token }) => token.colorErrorBg};
      border: 1px solid ${({ token }) => token.colorErrorBorder};
      padding: 6px 8px;
    }
    .error_str.proxy-error {
      background: #fff9df;
    }
    span {
      cursor: pointer;
      color: ${({ token }) => token.colorText};
    }
    .chioce-btn {
      color: #3a86ff;
    }
    .proxy-img {
      margin: 0 0 20px 0;
    }
  }
`;
