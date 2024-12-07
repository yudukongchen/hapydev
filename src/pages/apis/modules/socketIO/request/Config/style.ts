import styled from '@emotion/styled';
import { GlobalToken } from 'antd';

export const SettingsWrapper = styled.div<{ token: GlobalToken }>`
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
      }
      .desc {
        color: ${({ token }) => token.colorTextDescription};
      }
    }
    .right {
      width: 120px;
      .status-text {
        padding-left: 8px;
      }
    }
    &:hover {
      background-color: ${({ token }) => token.colorFillQuaternary};
    }
  }
`;
