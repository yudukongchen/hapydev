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
    width: 0;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    display: flex;
    flex-direction: row;
    align-items: center;

    .item-icon {
      margin-right: 10px;
      color: ${({ token }) => token.colorPrimary};
      svg {
        font-size: 14px;
      }
    }
    &.interface {
      .method {
        margin-right: 10px;
      }
      .api-item-icon {
        margin-top: 2px;
        margin-right: 10px;
        font-size: 14px;
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
        &.socket_io {
          color: #1890ff;
        }
      }
    }
  }
  .btn-close {
    width: 20px;
    height: 20px;
    align-items: center;
    justify-content: center;
    border-radius: 2px;
    background-color: transparent;
    display: flex;
    visibility: hidden;
    &:hover {
      background-color: ${({ token }) => token.controlItemBgHover};
    }
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
