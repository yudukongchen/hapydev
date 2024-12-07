import styled from '@emotion/styled';
import { GlobalToken } from 'antd';

export const ConfigWrapper = styled.div<{ token: GlobalToken }>`
  padding: 5px 0;
  .case-item {
    padding: 5px 10px;
    margin: 10px 0;
    display: flex;
    border-radius: 5px;
    flex-direction: row;
    gap: 30px;
    .left {
      flex: 1;
      .case-title {
        font-weight: bold;
        color: ${({ token }) => token.colorTextLabel};
        display: inline-flex;
        align-items: center;
        .switch-item {
          margin-left: 10px;
        }
      }
      .desc {
        color: ${({ token }) => token.colorTextDescription};
      }
    }
    .right {
      width: 140px;
      .ant-select,
      .ant-input-number {
        width: 120px;
      }
    }

    &:hover {
      background-color: ${({ token }) => token.colorFillQuaternary};
    }
  }
`;
