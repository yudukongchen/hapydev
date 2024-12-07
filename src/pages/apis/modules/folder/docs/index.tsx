import React from 'react';
import MDEditor from '@components/bus/MarkdownEditor';
import { theme } from 'antd';
import { DocsWrapper } from './style';

type Props = {
  value: string;
  onChange: (newVal: string) => void;
};

const Docs: React.FC<Props> = (props) => {
  const { value, onChange } = props;
  const { token } = theme.useToken();
  return (
    <DocsWrapper token={token}>
      <MDEditor value={value} onChange={onChange} />
    </DocsWrapper>
  );
};

export default Docs;
