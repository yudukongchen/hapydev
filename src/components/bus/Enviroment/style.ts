import { css } from '@emotion/css';
import styled from '@emotion/styled';
import { GlobalToken } from 'antd';

export const enviromentWrapper = css`
  .ant-dropdown-menu-item-selected {
    background-color: var(--ant-color-fill-secondary) !important;
    color: var(--ant-color-text-base) !important;
  }
`;

export const EnvIconWrapper = styled.div<{ token: GlobalToken }>`
  width: 20px;
  height: 20px;
  line-height: 20px;
  font-size: 12px !important;
  border-radius: 2px;
  display: block;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: var(--ant-color-fill-secondary);
  color: var(--ant-color-text-base);
`;

export const envTitleContent = css`
  flex: 1;
  display: flex;
  align-items: center;
  .span-text {
    padding: 0 10px;
    max-width: 200px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
`;

export const droplistWrapper = css`
  background-color: var(--ant-color-bg-elevated);
  border-radius: var(--ant-border-radius-lg);
  background-clip: padding-box;
  outline: none;
  box-shadow: var(--ant-box-shadow-secondary);
  padding: var(--ant-padding-xxs);

  .list-panel {
    max-height: 200px;
    overflow: auto;
    .ant-dropdown-menu-title-content {
      max-width: 200px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
  }

  & ul {
    background-color: transparent !important;
    box-shadow: none !important;
    padding: 0 !important;
  }
  .split-line {
    height: 1px;
    margin: 5px 0;
    background-color: var(--ant-color-split);
  }
  .btn-add-new {
    box-sizing: content-box;

    height: 32px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    padding-left: 15px;
    cursor: pointer;
    &:hover {
      background-color: var(--ant-color-fill-secondary) !important;
    }
  }
`;
