import styled from '@emotion/styled';
import { GlobalToken } from 'antd';

export const ExampleWrapper = styled.div<{ token: GlobalToken }>`
  display: flex;
  height: calc(100% - 5px);
  padding: 0 5px;

  flex-direction: column;
  .example-header {
    padding: 5px 0;
    display: flex;
    justify-content: space-between;

    .left-panel {
      display: flex;
      flex-direction: row;
      gap: 5px;
    }

    .right-panel {
      display: flex;
      flex-direction: row;
      gap: 15px;
      .btns-list {
        display: flex;
        flex-direction: row;
        gap: 5px;
      }
    }
  }

  .form-panel {
    flex: 1;
    height: 0;
    border-left: none;
    .form-item {
      height: 100%;
      display: flex;
      flex-direction: column;
      .form-title {
        height: 20px;
        padding: 5px;
        font-weight: 600;
        background-color: ${({ token }) => token.colorFillSecondary};
      }
      .form-content {
        flex: 1;
        height: 0;
        overflow: auto;
      }
    }
  }
`;
