import styled from '@emotion/styled';
import { GlobalToken } from 'antd';

export const ProjectsWrapper = styled.div<{ token: GlobalToken }>`
  height: 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;

  .logo-panel {
    width: 30px;
    height: 30px;
    img {
      width: 30px;
      height: 30px;
      border-radius: 5px;
    }
  }

  .titles {
    font-size: 14px;
    display: flex;
    align-items: center;
    gap: 5px;

    .team {
      height: 24px;
      padding: 0 5px;
      border-radius: 4px;
      font-size: 14px;
      display: flex;
      align-items: center;
      gap: 5px;
      cursor: pointer;
      &:hover {
        background-color: ${({ token }) => token.colorBgTextHover};
      }
    }
    .project {
      height: 24px;
      padding: 0 5px;
      border-radius: 4px;
      font-size: 14px;
      display: flex;
      align-items: center;
      gap: 5px;
      cursor: pointer;
      font-weight: 500;
      color: ${({ token }) => token.colorTextBase};
      &:hover {
        background-color: ${({ token }) => token.colorBgTextHover};
      }
      .icon-down {
        width: 10px;
        height: 10px;
        fill: currentColor;
      }
    }
  }

  .btns {
    margin-left: 10px;
    .create {
      background-color: var(--ant-button-text-hover-bg);
      &:hover {
        background-color: ${({ token }) => token.colorBgTextActive};
      }
    }
  }
`;
