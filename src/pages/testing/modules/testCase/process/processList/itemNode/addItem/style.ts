import styled from '@emotion/styled';
import { GlobalToken } from 'antd';

export const AddItemWrapper = styled.div<{ token: GlobalToken }>`
  width: 100%;
  margin: 5px 0;
  height: 32px;
  border: 1px dashed ${({ token }) => token.colorBorderSecondary};
  border-radius: 4px;
  text-align: center;
  background-color: ${({ token }) => token.colorBgContainer};

  &:hover {
    border: 1px dashed ${({ token }) => token.colorPrimary};
  }

  .add-text {
    height: 32px;
    cursor: pointer;
    line-height: 32px;
    width: 360px;
    display: inline-block;
    margin: 0 auto;
  }
  &.is-over {
    background-color: ${({ token }) => token.colorPrimary};
  }
`;
