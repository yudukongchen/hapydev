import MonacoEditor from '@components/base/MonacoEditor';

const Beautify = (props) => {
  const { value, language = 'text' } = props;

  return <MonacoEditor language={language} value={value} readOnly />;
};

export default Beautify;
