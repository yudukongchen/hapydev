import styled from '@emotion/styled';
import { GlobalToken } from 'antd';

export const RightPanelWrapper = styled.div<{ token: GlobalToken }>`
  height: 100%;
  display: flex;
  flex-direction: column;

  .right-container {
    flex: 1;
  }

  .header {
    height: 30px;
    box-sizing: content-box;
    padding: 20px 10px;
    .team-name {
      display: inline-block;
      font-size: 20px;
      font-weight: 500;
    }
  }
  .nav-panel {
    padding: 10px;
    display: flex;
    justify-content: space-between;
  }
  .body-panel {
    height: 0;
    margin-bottom: 10px;
    flex: 1;
    overflow: auto;
  }

  .team-role {
    display: inline-block;
    font-size: 12px;
    padding: 0 5px;
    margin-left: 5px;
    border-radius: 4px;
    &.owner {
      background-color: ${({ token }) => token.colorErrorBgHover};
      color: ${({ token }) => token.colorErrorText};
    }
    &.manager {
      background-color: ${({ token }) => token.colorSuccessBgHover};
      color: ${({ token }) => token.colorSuccessText};
    }
    &.developer {
      background-color: ${({ token }) => token.colorInfoBgHover};
      color: ${({ token }) => token.colorInfoText};
    }
    &.visitor {
      background-color: ${({ token }) => token.colorWarningBgHover};
      color: ${({ token }) => token.colorWarningText};
    }
  }
`;
