import styled from '@emotion/styled';
import { GlobalToken } from 'antd';

export const ProjectWrapper = styled.div<{ token: GlobalToken }>`
  height: 100%;
  padding: 5px;
  box-sizing: content-box;
  overflow: auto;

  .container-box {
    border: 1px solid ${({ token }) => token.colorBorderSecondary};
    border-radius: 3px;
    padding: 20px 15px;
    .big-title {
      font-size: 16px;
    }
  }

  .article-items {
    margin-top: 10px;
    display: flex;
    flex-direction: row;
    .case-item {
      flex: 1;
      .item-count {
        font-size: 24px;
      }
    }
  }

  .two-panels {
    margin-top: 10px;
    display: flex;
    flex-direction: row;
    gap: 10px;
  }
`;
