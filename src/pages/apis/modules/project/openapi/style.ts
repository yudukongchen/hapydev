import styled from '@emotion/styled';
import { GlobalToken } from 'antd';

export const OpenApiWrapper = styled.div<{ token: GlobalToken }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  .desc-content {
    flex: 1;
    padding-top: 10px;
    span {
      padding-left: 5px;
      color: ${({ token }) => token.colorTextDescription};
    }
  }
  .btn-panel {
    margin-top: 20px;
    .ant-btn {
      display: flex;
      align-items: center;
    }
    svg {
      width: 16px;
      height: 16px;
    }
  }
`;
