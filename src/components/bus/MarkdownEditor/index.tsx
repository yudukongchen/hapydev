import React from 'react';
import { Editor } from '@bytemd/react';
import zh_Hans from './locale/zh_Hans';
import { MDEditorWrapper } from './style';
import { theme } from 'antd';
import cn from 'classnames';
import './tippy.css';
import './theme.less';
import './table.less';

type Props = {
  value: string;
  onChange?: (val: string) => void;
  className?: string;
  readonly?: boolean;
};

const ByteMD: React.FC<Props> = (props) => {
  const { value, onChange, className, readonly } = props;
  const { token } = theme.useToken();

  const editorConfig: Omit<CodeMirror.EditorConfiguration, 'value' | 'placeholder'> = {
    autofocus: true,
    readOnly: readonly,
  };

  return (
    <MDEditorWrapper token={token} className={cn(className)}>
      <Editor
        locale={zh_Hans}
        mode="split"
        editorConfig={editorConfig}
        value={value}
        onChange={onChange}
      />
    </MDEditorWrapper>
  );
};

export default ByteMD;
