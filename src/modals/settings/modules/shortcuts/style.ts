import styled from '@emotion/styled';
import { GlobalToken } from 'antd';

export const ShortCutsWrapper = styled.div<{ token: GlobalToken }>`
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  .group-items-panel {
    flex: 1;
    overflow: auto;
    margin-top: 15px;
    position: relative;

    &.disable {
      color: ${({ token }) => token.colorTextDisabled};
      user-select: none;
      -webkit-user-select: none;
      -moz-user-select: none;
      .ant-input {
        color: ${({ token }) => token.colorTextDisabled};
        user-select: none;
        -webkit-user-select: none;
        -moz-user-select: none;
      }
    }
  }

  .group-items {
    .group-title {
      font-size: 14px;
      padding-left: 8px;
      font-weight: bold;
    }

    .group-item-child {
      display: flex;
      flex-direction: row;
      margin: 5px 0;
      padding: 5px 16px;

      .item-title {
        flex: 1;
      }
      .item-value {
        width: 160px;
      }
    }
  }
`;
