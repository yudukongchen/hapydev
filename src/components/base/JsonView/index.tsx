import React from 'react';
import { theme } from 'antd';
import hljs from 'highlight.js/lib/core';
import beautify from 'json-beautify';
import { JsonViewWrapperLight, JsonViewWrapperDark } from './style';
import json from 'highlight.js/lib/languages/json';
import { useSelector } from 'react-redux';
hljs.registerLanguage('json', json);

type Props = {
  value: string;
};

const JsonViewer: React.FC<Props> = (props) => {
  const { value } = props;

  const theme_name = useSelector((store: any) => store?.user?.settings?.base?.program_theme);
  const isDark = theme_name.indexOf('dark') !== -1;
  const { token } = theme.useToken();

  function createMarkup() {
    return {
      __html: hljs.highlight(beautify(JSON.parse(value), null, 2, 80), {
        language: 'json',
      }).value,
    };
  }

  const JsonViewWrapper = isDark !== true ? JsonViewWrapperLight : JsonViewWrapperDark;

  return (
    <JsonViewWrapper token={token}>
      <pre>
        <code dangerouslySetInnerHTML={createMarkup()} />
      </pre>
    </JsonViewWrapper>
  );
};

export default JsonViewer;
