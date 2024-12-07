import styled from '@emotion/styled';
import { GlobalToken } from 'antd';

export const ModalWrapper = styled.div<{ token: GlobalToken }>`
  padding: 10px 0;
  .case-title {
    padding: 5px 0;
    .c-red {
      padding: 0 3px;
      background-color: ${({ token }) => token.colorErrorBg};
      color: ${({ token }) => token.colorErrorText};
    }
  }

  .select-item {
    width: 100%;
  }
`;
