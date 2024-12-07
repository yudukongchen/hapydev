import styled from '@emotion/styled';
import { GlobalToken } from 'antd';

export const ReportInfoWrapper = styled.div<{ token: GlobalToken }>`
  height: 100%;
  overflow: auto;

  color: ${({ token }) => token.colorText};

  .base-info {
    border-radius: 4px;
    padding: 5px 10px;
    background-color: ${({ token }) => token.colorFillTertiary};
  }

  .progress-panel {
    padding: 10px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    .progress {
      flex: 1;
    }
    .text-panel {
      text-align: right;
      width: 70px;
    }
  }
`;
