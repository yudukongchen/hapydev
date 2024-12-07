import styled from '@emotion/styled';
import { GlobalToken } from 'antd';

export const EmptyWrapper = styled.div<{ token: GlobalToken }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .box-panel {
    display: grid;
    padding: 0 50px;
    grid-template-columns: repeat(auto-fit, 310px);
    grid-gap: 10px;
    gap: 10px;
    align-content: center;
    justify-content: center;
    & > div {
      display: grid;
      grid-template-columns: repeat(auto-fit, 150px);
      grid-gap: 10px;
      gap: 10px;
      align-content: center;
      justify-content: center;
    }
    .box-item {
      width: 150px;
      height: 190px;
      border-radius: 5px;
      border: 1px solid ${({ token }) => token.colorBorderSecondary};
      display: flex;
      flex-direction: column;
      cursor: pointer;
      .svg {
        width: 150px;
        height: 150px;
        display: flex;
        justify-content: center;
        align-items: center;
        svg {
          width: 40px;
          height: 40px;
        }
      }
      &:hover {
        background-color: ${({ token }) => token.colorFillQuaternary};
      }
      .text {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: ${({ token }) => token.colorFillSecondary};
        text-align: center;
      }
      &.api svg {
        fill: #ee46bc;
      }
      &.markdown svg {
        fill: #2e90fa;
      }
      &.websocket svg {
        fill: #06aed4;
      }
      &.grpc svg {
        fill: #9373ee;
      }
    }
  }

  .more-actions {
    margin: 50px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 10px;
  }
`;
