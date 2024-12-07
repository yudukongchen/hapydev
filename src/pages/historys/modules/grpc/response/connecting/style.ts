import styled from '@emotion/styled';
import { GlobalToken } from 'antd';

export const ConnectingWrapper = styled.div<{ token: GlobalToken }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ token }) => token.colorBgLayout};
  opacity: 0.9;
  z-index: 1;
  color: ${({ token }) => token.colorTextSecondary};

  @keyframes lineLoading {
    0% {
      left: 0;
    }
    50% {
      left: 50%;
    }
    100% {
      left: 100%;
    }
  }
  .status-bar {
    position: absolute;
    left: 0;
    top: 0;
    width: 189px;
    height: 2px;
    background: linear-gradient(
      90deg,
      ${({ token }) => token.colorPrimary} 0%,
      rgba(40, 126, 255, 0) 100%
    );
    transform: matrix(-1, 0, 0, 1, 0, 0);
    animation: lineLoading 2s linear infinite;
    -webkit-animation: lineLoading 2s linear infinite;
  }
  .connecting-panel {
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .title {
      margin-bottom: 22px;
    }
  }
`;
