import styled from '@emotion/styled';
import { GlobalToken } from 'antd';

export const NoticeWrapper = styled.div<{ token: GlobalToken }>`
  flex: 1;
  height: 0;
  display: flex;
  flex-direction: column;
  .webhook-header {
    .case-title {
      margin-top: 20px;
      padding-bottom: 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .title {
        font-size: 16px;
        font-weight: 500;
      }
      .slot-item {
        display: flex;
        align-items: center;
        gap: 5px;
      }
    }
  }
  .list-wrapper {
    flex: 1;
    margin: 10px 0;
    overflow: auto;
  }
`;
