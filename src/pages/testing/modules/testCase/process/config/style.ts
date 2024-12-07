import styled from '@emotion/styled';
import { GlobalToken } from 'antd';

export const OptionsWrapper = styled.div<{ token: GlobalToken }>`
  width: 320px;
  padding: 20px;
  border-radius: 5px;
  overflow: hidden;
  overflow-y: auto;

  background-color: ${({ token }) => token.colorFillTertiary};

  .split-items {
    display: flex;
    flex-direction: row;
    gap: 10px;
    .form-item {
      flex: 1;
    }
  }

  .ckb-items {
    width: 100%;
    margin-bottom: 10px;
    align-items: center;
    display: flex;
  }

  .case-title {
    width: 100%;
    height: 26px;
    line-height: 26px;
    padding-bottom: 4px;
  }
  .case-item {
    width: 100%;
    margin-bottom: 10px;
  }
  .env-item {
    width: 100%;
    margin-bottom: 10px;
    & > .ant-space-compact {
      display: flex;
      & > button:first-of-type {
        flex: 1;
      }
    }
  }
`;
