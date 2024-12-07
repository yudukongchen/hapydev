import styled from '@emotion/styled';

export const ColorsWrapper = styled.div`
  padding: 15px 0;
  .case-colors {
    margin-top: 15px;
    display: flex;
    justify-content: space-between;
    .color-item {
      width: 34px;
      height: 34px;
      border-radius: 3px;
      float: left;
      cursor: pointer;
      font-size: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      svg {
        width: 18px;
        height: 18px;
        fill: #ffffff;
      }
    }
  }
`;
