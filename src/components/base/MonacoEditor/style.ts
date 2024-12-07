import styled from '@emotion/styled';
import { GlobalToken } from 'antd';

export const MonacoWrapper = styled.div<{ token: GlobalToken }>`
  border-left: 1px solid ${({ token }) => token.colorBorderSecondary};
  border-right: 1px solid ${({ token }) => token.colorBorderSecondary};
  .margin-view-overlays {
    background-color: ${({ token }) => token.colorBorderSecondary};
  }
  overflow: hidden;
  .monaco-editor {
    .margin {
      border-right: 1px solid ${({ token }) => token.colorBorderSecondary};
    }
  }

  .monaco-editor-background {
    background: none;
  }

  .monaco-editor .view-overlays .current-line {
    border: 1px solid ${({ token }) => token.colorBorderSecondary} !important;
  }

  .monaco-editor .scroll-decoration {
    display: none;
  }

  .dark {
    .monaco-editor .margin {
      background-color: ${({ token }) => token.colorBgContainer} !important;
    }

    .monaco-editor .monaco-editor-background {
      background-color: ${({ token }) => token.colorBgContainer} !important;
    }
  }
`;
