import MonacoEditor from '@components/base/MonacoEditor';
import { css } from '@emotion/css';
import { useMount, useSafeState } from 'ahooks';
import { Select } from 'antd';
import React, { useEffect } from 'react';

const SelectOptions = [
  { label: 'Text', value: 'text' },
  { label: 'Json', value: 'json' },
  { label: 'Html', value: 'html' },
  { label: 'Xml', value: 'xml' },
];

type Props = {
  content_type: string;
  text: any;
};
const Editor: React.FC<Props> = (props) => {
  const { content_type, text } = props;

  const [language, setLanguage] = useSafeState(content_type);

  useMount(() => {
    setLanguage(content_type);
  });

  return (
    <div className="editor-panel">
      <div className="editor-header">
        <Select
          size="small"
          value={language}
          onChange={setLanguage}
          variant="borderless"
          popupClassName={css`
            width: 100px !important;
          `}
          options={SelectOptions}
        ></Select>
      </div>

      <div className="editor-cont">
        <MonacoEditor language={language} value={text} readOnly />
      </div>
    </div>
  );
};
export default Editor;
