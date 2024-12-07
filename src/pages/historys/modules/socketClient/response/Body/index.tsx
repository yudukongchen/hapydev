import { Segmented, Select } from 'antd';
import { BODY_MODES, CONTENT_LANGUAGES } from './constants';
import { BodyWrapper, languageWrapper } from './style';
import { useMemoizedFn, useSafeState } from 'ahooks';
import { Buffer } from 'buffer/';
import React, { useEffect, useMemo } from 'react';
import { isUndefined } from 'lodash';
import Beautify from './beautify';
import Preview from './preview';
import Visualiz from './visualiz';

type Props = {
  response: any;
  visualiz_html: string;
};

const Body: React.FC<Props> = (props) => {
  const { response, visualiz_html } = props;

  const [mode, setMode] = useSafeState<string>('beautify');

  const [language, setLanguage] = useSafeState('html');

  const rawBody = useMemo(() => {
    if (isUndefined(response?.stream)) {
      return '';
    }
    const buffer = Buffer.from(response?.stream);
    return buffer.toString();
  }, [response]);

  const handleAutoLanguage = useMemoizedFn(() => {
    for (var item of CONTENT_LANGUAGES) {
      if (response?.mime?.ext === item) {
        setLanguage(item);
        return;
      }
    }
    setLanguage('text');
  });

  const handleLanguageChange = useMemoizedFn((newVal) => {
    if (newVal === 'auto') {
      handleAutoLanguage();
      return;
    }
    setLanguage(newVal);
  });

  //自动切换language
  useEffect(() => {
    handleAutoLanguage();
  }, [response?.mime]);

  return (
    <BodyWrapper>
      <div className="body-headers ">
        <Segmented value={mode} onChange={setMode} options={BODY_MODES} size="small" />
        {['source', 'beautify'].includes(mode) && (
          <Select
            style={{ marginLeft: 6 }}
            popupClassName={languageWrapper}
            size="small"
            value={language}
            onChange={handleLanguageChange}
            options={CONTENT_LANGUAGES.map((item) => ({ label: item, value: item }))}
          />
        )}
      </div>
      <div className="body-contents">
        {['source', 'beautify'].includes(mode) && (
          <Beautify language={mode === 'source' ? 'text' : language} value={rawBody} />
        )}
        {mode === 'preview' && <Preview response={response} rawBody={rawBody} />}
        {mode === 'visualizing' && <Visualiz html={visualiz_html} />}
      </div>
    </BodyWrapper>
  );
};

export default Body;
