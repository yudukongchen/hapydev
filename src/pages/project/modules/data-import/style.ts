import styled from '@emotion/styled';
import { GlobalToken } from 'antd';

export const DataImportWrapper = styled.div<{ token: GlobalToken }>`
  .types-container {
    margin-top: 10px;
    display: grid;
    grid-auto-rows: 50px;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    grid-gap: 16px;
    gap: 16px;
    .type-item {
      border: 1px solid ${({ token }) => token.colorBorderSecondary};
      border-radius: 4px;
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: 0 10px;
      gap: 10px;
      cursor: pointer;
      &.disabled {
        cursor: not-allowed;
        & > div {
          opacity: 0.2;
        }
      }
      &.active {
        font-weight: 600;
        border-color: ${({ token }) => token.colorPrimary};
        color: ${({ token }) => token.colorPrimary};
        position: relative;
        overflow: hidden;
        &::after {
          content: '';
          width: 50px;
          height: 50px;
          right: -30px;
          bottom: -30px;
          background-color: ${({ token }) => token.colorPrimary};
          position: absolute;
          transform: rotate(45deg);
        }
      }
      .icon {
        height: 30px;
        overflow: hidden;
        img {
          border-radius: 3px;
          width: 30px;
          height: 30px;
        }
      }
      .title {
        flex: 1;
      }
    }
  }

  .import-panel {
    margin-top: 10px;
    .upload-form {
      margin-top: 10px;
      padding: 10px 0;
      .upload-icon {
        width: 24px;
        height: 24px;
        fill: ${({ token }) => token.colorPrimary};
      }
      .upload-text {
        margin-top: 10px;
        color: ${({ token }) => token.colorPrimary};
      }
    }
    .image-form {
      padding: 20px 0;
      display: flex;
      justify-content: center;
    }
  }
`;
