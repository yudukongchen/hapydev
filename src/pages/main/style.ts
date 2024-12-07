import styled from '@emotion/styled';
import { GlobalToken } from 'antd';

export const MainPageWrapper = styled.div<{ token: GlobalToken }>`
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  .invite-button {
    width: 72px;
    height: 60px;
    position: absolute;
    left: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    color: ${({ token }) => token.colorText};
    cursor: pointer;
    .svg-icon {
      font-size: 18px;
      fill: currentColor;
    }
    .invite-text {
      padding-top: 5px;
    }
    &:hover {
      color: ${({ token }) => token.colorPrimary};
    }
  }

  .left-tabs {
    flex: 1;
    height: 0;
    .left-tabs-content {
      background-color: ${({ token }) => token.colorBgElevated};
    }
    .left-tabs-nav-list {
      background-color: ${({ token }) => token.colorBgLayout};
      .left-tabs-tab-active {
        .item-title,
        svg {
          color: ${({ token }) => token.colorTextBase};
          font-weight: initial;
          text-shadow: none;
        }
        background-color: ${({ token }) => token.colorFillTertiary};
      }
    }
    .left-tabs-tab {
      width: 72px;
      padding: 0 !important;
      margin: 0 !important;
      .tab-menu-item {
        width: 72px;
        height: 60px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .item-title {
          padding-top: 5px;
        }
      }
    }

    .left-tabs-ink-bar {
      right: auto;
      width: 3px !important;
      left: 0;
    }
    .left-tabs-content {
      height: 100%;
      .left-tabs-tabpane {
        padding-left: 0 !important;
        height: 100%;
      }
    }
    .left-tabs-content-holder {
      border-left: none !important;
    }
  }
`;
