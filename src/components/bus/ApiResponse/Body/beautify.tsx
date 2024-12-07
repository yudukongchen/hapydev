import MonacoEditor from '@components/base/MonacoEditor';
import { useMemo } from 'react';
import beautify from 'json-beautify';

const Beautify = (props) => {
  const { value, language = 'text' } = props;

  const formatText = useMemo(() => {
    try {
      if (language === 'json') {
        return beautify(JSON.parse(value), null, 2, 80);
      }
    } catch (ex) {
      return value;
    }
    return value;
  }, [value, language]);

  return <MonacoEditor language={language} value={formatText} readOnly />;
};

export default Beautify;
