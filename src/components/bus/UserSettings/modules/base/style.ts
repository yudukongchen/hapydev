import styled from '@emotion/styled';
import { GlobalToken } from 'antd';

export const BaseWrapper = styled.div<{ token: GlobalToken }>`
  font-size: 14px;

  .form-item {
    display: flex;
    flex-direction: row;
    padding: 15px 0;
    border-bottom: 1px solid ${({ token }) => token.colorBorderSecondary};
    align-items: center;
    .case-title {
      width: 100px;
    }
    .case-value {
      flex: 1;

      img {
        width: 40px;
        height: 40px;
      }
    }
    .btns {
      width: 160px;
      display: flex;
      gap: 10px;
      justify-content: flex-end;
      align-items: center;
    }
    &:last-child {
      border-bottom: none;
    }
  }
`;
