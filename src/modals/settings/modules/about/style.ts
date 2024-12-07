import styled from '@emotion/styled';
import { GlobalToken } from 'antd';

export const AboutWrapper = styled.div<{ token: GlobalToken }>`
  font-size: 14px;
  .img-logo {
    width: 90px;
    height: 90px;
    border: none;
  }
  .img-item {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    dd {
      font-size: 18px;
    }
    dl {
    }
  }
  .info-panel {
    margin-top: 20px;
    .info-item {
      padding-left: 8px;
      margin-top: 10px;

      .svg-icon {
        color: ${({ token }) => token.colorSuccess};
      }
    }
  }
`;
