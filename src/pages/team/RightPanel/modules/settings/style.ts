import styled from '@emotion/styled';
import { GlobalToken } from 'antd';

export const BasePanelWrapper = styled.div<{ token: GlobalToken }>`
  padding: 0 10px;
  .item-case {
    padding: 10px 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    border-bottom: 1px solid ${({ token }) => token.colorBorderSecondary};
    gap: 40px;
    .item-left {
      flex: 1;
      font-size: 14px;
      .case-name {
        padding: 5px 0;
        font-weight: 500;
        font-variant-numeric: tabular-nums;
        .dander {
          color: ${({ token }) => token.colorWarningText};
        }
      }
      .case-title {
        padding: 5px 0;
      }
      .case-desc {
        padding: 5px 0;
        color: ${({ token }) => token.colorTextDescription};
      }
    }
    .item-right {
    }
  }
`;
