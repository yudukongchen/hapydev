import MonacoEditor from '@components/base/MonacoEditor';
import { css } from '@emotion/css';
import { useMemoizedFn, useMount, useSafeState } from 'ahooks';
import { Button, message, Select, Tooltip } from 'antd';
import React from 'react';
import SvgFormat from '@assets/icons/format.svg?react';
import { formatCode } from '@utils/formatCode';

const SelectOptions = [
  { label: 'text', value: 'text' },
  { label: 'json', value: 'json' },
  { label: 'html', value: 'html' },
  { label: 'xml', value: 'xml' },
];

type Props = {
  content_type: string;
  text: any;
};
const Editor: React.FC<Props> = (props) => {
  const { content_type, text } = props;

  const [language, setLanguage] = useSafeState<any>(content_type);
  const [viewText, setViewText] = useSafeState(null);

  const handleFormatCode = useMemoizedFn(async (language) => {
    try {
      const result = await formatCode(text, language);
      setViewText(result);
    } catch (ex) {
      //message.error(ex.message);
    }
  });

  useMount(() => {
    setLanguage(content_type);
    handleFormatCode(content_type);
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
        <Tooltip title="格式化">
          <Button
            onClick={handleFormatCode.bind(null, language)}
            size="small"
            icon={<SvgFormat style={{ width: 16, height: 16 }} />}
            type="text"
          />
        </Tooltip>
      </div>
      <div className="editor-cont">
        <MonacoEditor language={language} value={viewText ?? text} readOnly />
      </div>
    </div>
  );
};
export default Editor;
