import styled from '@emotion/styled';
import { GlobalToken } from 'antd';

export const ProcessListWrapper = styled.div<{ token: GlobalToken }>`
  flex: 1;
  overflow: hidden;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  .list-panel {
    flex: 1;
    overflow: auto;
  }

  .add-panel {
    margin: 10px 0;
    height: 32px;
    border: 1px dashed ${({ token }) => token.colorBorderSecondary};
    border-radius: 4px;
    text-align: center;
    background-color: ${({ token }) => token.colorBgContainer};

    &:hover {
      border: 1px dashed ${({ token }) => token.colorPrimary};
    }

    .btn-add {
      height: 32px;
      cursor: pointer;
      line-height: 32px;
      width: 360px;
      display: inline-block;
      margin: 0 auto;
    }
  }
`;
