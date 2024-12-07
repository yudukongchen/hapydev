import styled from '@emotion/styled';
import { GlobalToken } from 'antd';

export const RightPanelWrapper = styled.div<{ token: GlobalToken }>`
  flex: 1;
  padding: 20px;
  box-sizing: border-box;
  .form-title {
    font-size: 14px;
    font-weight: bold;
  }
  .form-text {
    margin-top: 10px;
    &.description {
      height: 60px;
      resize: none;
    }
  }
  .big-title {
    height: 30px;
    padding: 10px 0;
    text-align: center;
    font-size: 24px;
  }
  .team-title {
    padding: 10px 0;
    font-size: 14px;
  }
  .case-item {
    padding: 10px 0;
  }
  .txt-panel {
    padding: 10px 0;
  }
  .btn-save {
    margin-top: 10px;
    width: 100%;
  }
`;
