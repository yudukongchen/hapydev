import { loader } from '@monaco-editor/react';
import { getPublicPath } from '@utils/path';
let fileurl = `${getPublicPath()}/scripts/monaco-editor/min/vs`;
loader.config({
  paths: { vs: fileurl },
  'vs/nls': {
    availableLanguages: { '*': 'zh-cn' },
  },
});

loader.init().then((monaco) => {
  monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
    validate: true,
    allowComments: true,
    comments: 'ignore',
    trailingCommas: 'ignore',
  });
  monaco.languages.html.registerHTMLLanguageService('xml', {}, { documentFormattingEdits: true });
});
