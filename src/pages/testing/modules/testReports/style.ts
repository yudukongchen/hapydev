import styled from '@emotion/styled';
import { GlobalToken } from 'antd';

export const TestReportsWrapper = styled.div<{ token: GlobalToken }>`
  overflow: auto;
  flex: 1;

  .data-list {
    margin: 0 5px;
  }
  .base-info {
    vertical-align: middle;
    overflow: hidden;
    & > div {
      display: flex;
      flex-direction: column;
      .report-name {
        color: ${({ token }) => token.colorInfoText};

        .title {
          margin-left: 5px;
          cursor: pointer;
        }
      }
      .info-item {
        span {
          margin-right: 20px;
        }
      }
    }
  }

  .result-info {
    width: 30%;
    & > div {
      display: flex;
      flex-direction: row;
      gap: 20px;
      .case-item {
        flex: 1;
      }
    }
  }
  .status-info {
    width: 100px;
    vertical-align: middle;
    & > div {
      display: inline-flex;
      padding: 0 5px;
      border-radius: 4px;
      gap: 5px;
      white-space: nowrap;
      font-size: 12px;
      &.progressing {
        background-color: ${({ token }) => token.colorInfoBg};
        color: ${({ token }) => token.colorInfoText};
        border: 1px solid ${({ token }) => token.colorInfoBorder};
      }
      &.completed {
        background-color: ${({ token }) => token.colorSuccessBg};
        color: ${({ token }) => token.colorSuccessText};
        border: 1px solid ${({ token }) => token.colorSuccessBorder};
      }
      &.terminated {
        background-color: ${({ token }) => token.colorWarningBg};
        color: ${({ token }) => token.colorWarningText};
        border: 1px solid ${({ token }) => token.colorWarningBorder};
      }
    }
  }
  .more-info {
    width: 80px;
    vertical-align: middle;
  }
`;
