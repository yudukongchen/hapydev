import styled from '@emotion/styled';
import { GlobalToken } from 'antd';

export const RightPanelWrapper = styled.div<{ token: GlobalToken }>`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: 10px;

  .case-title {
    margin: 10px 0 3px 0;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    display: flex;
    align-items: center;

    .span-svg {
      display: flex;
      align-items: center;
    }
    .case-title-icon {
      width: 14px;
      height: 14px;
      margin-left: 8px;
      fill: currentColor;
    }
  }

  .env-title {
    margin-top: 5px;
    display: flex;
    flex-direction: row;
    align-items: center;
    .env-title-icon {
      width: 20px;
      height: 20px;
      line-height: 20px;
      font-size: 14px !important;
      border-radius: 2px;
      display: block;
      justify-content: center;
      align-items: center;
      text-align: center;
      cursor: pointer;
      white-space: nowrap;
    }
    .env-title-right {
      flex: 1;
      margin-left: 10px;
    }
  }

  .scroll-panels {
    flex: 1;
    overflow: auto;
    margin: 10px 0;
    padding-bottom: 10px;
  }
  .bottom-panel {
    height: 60px;
    padding-right: 30px;
    gap: 10px;
    display: flex;
    justify-content: flex-end;
  }
`;
