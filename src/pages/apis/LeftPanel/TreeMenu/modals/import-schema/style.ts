import styled from '@emotion/styled';
import { GlobalToken } from 'antd';

export const SchemaWrapper = styled.div<{ token: GlobalToken }>`
  padding: 10px 0;

  .tips {
    margin-bottom: 10px;
  }

  .warning {
    margin: 0 5px;
    color: ${({ token }) => token.colorWarningText};
  }
`;
