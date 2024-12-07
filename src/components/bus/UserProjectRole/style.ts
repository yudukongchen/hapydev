import styled from '@emotion/styled';
import { GlobalToken } from 'antd';

export const ListWrapper = styled.div<{ token: GlobalToken }>`
  .ant-table-cell {
    vertical-align: middle;
  }
  .name-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    .logo {
      width: 30px;
      height: 30px;
      border-radius: 4px;
      overflow: hidden;
      img {
        width: 30px;
        height: 30px;
      }
    }
    .p-title {
      flex: 1;
      width: 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .title-panel {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;
