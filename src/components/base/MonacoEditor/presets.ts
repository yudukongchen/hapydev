import { loader } from '@monaco-editor/react';
let fileurl = `${import.meta.env.VITE_PUBLIC_PATH}/scripts/monaco-editor/min/vs`;
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
