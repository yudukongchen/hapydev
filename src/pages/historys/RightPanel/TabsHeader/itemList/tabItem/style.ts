import styled from '@emotion/styled';
import { GlobalToken } from 'antd';

export const TabItemWrapper = styled.div<{ token: GlobalToken }>`
  width: 150px;
  height: 38px;
  font-size: 12px;
  padding: 0 5px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  user-select: none;
  position: relative;
  cursor: pointer;
  border-radius: 5px 5px 0 0;
  &.selected {
    background-color: ${({ token }) => token.colorBgBase};
    z-index: 100;
  }
  .item-title {
    flex: 1;
    height: 38px;
    line-height: 38px;
    align-items: center;
    width: 0;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

    .method {
      margin-right: 10px;
    }

    .item-icon {
      margin-right: 10px;
      color: ${({ token }) => token.colorPrimary};
      &.grpc {
        color: #1890ff;
      }
      &.socket {
        color: #1890ff;
      }
      &.socket_service {
        color: #1890ff;
      }
      &.socket_client {
        font-size: 12px;
        color: #9373ee;
        font-weight: 700;
      }
      &.websocket {
        color: #1890ff;
      }
    }
  }
  .btn-close {
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 2px;
    background-color: transparent;
    visibility: hidden;
  }

  .btn-comfirm-close {
    width: 20px;
    height: 20px;
    align-items: center;
    justify-content: center;
    border-radius: 2px;
    background-color: transparent;
    display: flex;
    &::after {
      content: '';
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background-color: red;
      display: block;
    }
    & > svg {
      display: none;
    }
    &:hover {
      &::after {
        display: none;
      }
      & > svg {
        display: block;
      }
    }
  }

  &:hover {
    .btn-close {
      visibility: visible;
    }
    .btn-comfirm-close {
      display: flex;
    }
  }
`;
