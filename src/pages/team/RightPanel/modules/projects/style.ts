import styled from '@emotion/styled';
import { GlobalToken } from 'antd';

export const ProjectWrapper = styled.div<{ token: GlobalToken }>`
  .list-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, auto));
    grid-gap: 16px;
    gap: 16px;
    padding: 0 10px;
    .list-item {
      border: 1px solid ${({ token }) => token.colorBorderSecondary};
      border-radius: 5px;
      padding: 15px 10px;
      gap: 10px;
      cursor: pointer;
      .img-panel {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        flex-direction: row;
        .img-icon {
          width: 36px;
          height: 36px;
          border-radius: 4px;
          overflow: hidden;
        }
      }
      .text {
        margin-top: 16px;
        font-size: 16px;
        font-weight: 500;
        white-space: nowrap;
      }
      .desc {
        font-size: 14px;
        margin-top: 6px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: ${({ token }) => token.colorTextDescription};
      }
      &:hover {
        box-shadow: ${({ token }) => token.boxShadowSecondary};
      }
    }
  }
`;
