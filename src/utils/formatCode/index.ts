import * as prettier from 'prettier';

export const formatHtml = async (str) => {
  const estreePlugin = await import('prettier/plugins/estree');
  const htmlPlugin = await import('prettier/plugins/html');
  const result = await prettier.format(str, {
    parser: 'html',
    plugins: [estreePlugin.default, htmlPlugin.default],
  });
  return result;
};

export const formatXml = async (str) => {
  const xmlFormat = await import('xml-formatter');
  return xmlFormat.default(str, { collapseContent: true });
};

export const formatJson = async (str) => {
  const estreePlugin = await import('prettier/plugins/estree');
  const babelPlugin = await import('prettier/plugins/babel');
  const result = await prettier.format(str, {
    parser: 'json',
    plugins: [estreePlugin.default, babelPlugin.default],
  });
  return result;
};

export const formatJavascript = async (str) => {
  const estreePlugin = await import('prettier/plugins/estree');
  const babelPlugin = await import('prettier/plugins/babel');
  const result = await prettier.format(str, {
    parser: 'babel',
    plugins: [estreePlugin.default, babelPlugin.default],
  });
  return result;
};

type Language = 'json' | 'javascript' | 'html' | 'xml';
export const formatCode = async (str, language: Language) => {
  let result = str;
  if (language === 'html') {
    result = await formatHtml(str);
  }
  if (language === 'xml') {
    result = await formatXml(str);
  }
  if (language === 'json') {
    result = await formatJson(str);
  }
  if (language === 'javascript') {
    result = await formatJavascript(str);
  }
  return result;
};
