import styled from '@emotion/styled';
import { GlobalToken } from 'antd';

export const SchemaWrapper = styled.div<{ token: GlobalToken }>`
  position: relative;
  color: ${({ token }) => token.colorTextTertiary};
  border: 1px solid ${({ token }) => token.colorBorderSecondary};
`;
