import styled from '@emotion/styled';
import { GlobalToken } from 'antd';

export const InviteWrapper = styled.div<{ token: GlobalToken }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  color: ${({ token }) => token.colorTextDescription};

  .logo-panel {
    height: 80px;
    display: flex;
    flex-direction: row;
    align-items: center;
    .logo {
      height: 80px;
    }
    .name {
      padding-left: 10px;
      font-size: 48px;
      color: ${({ token }) => token.colorTextBase};
    }
  }
  .invite-desc {
    padding: 30px 0;
    font-size: 24px;
    font-weight: 500;
    color: ${({ token }) => token.colorTextBase};
    &.error {
      color: ${({ token }) => token.colorErrorText};
    }
  }

  .btn-panel {
    padding: 20px 0;
    button {
      width: 240px;
    }
  }
  .corypy-right {
    font-size: 14px;
    padding: 10px;
    .crop-name {
      color: ${({ token }) => token.colorPrimary};
    }
  }

  .footer {
    position: fixed;
    font-size: 14px;
    bottom: 20px;
    padding-bottom: 20px;
    .split {
      margin: 0 8px;
    }
  }
`;
