import { saveAs } from 'file-saver';
import { isNull } from 'lodash';
import { isElectron } from './is';
import { urljoins } from 'urljoins';

export const openUrl = (url) => {
  if (isElectron()) {
    const shell = window?.electron?.shell;
    shell.openExternal(url);
    return;
  }
  window.open(url);
};

export const download = (response) => {
  const data = new Int8Array(response?.stream);
  const saveAsData = new Blob([data], {
    type: response.mime.mime,
  });
  saveAs(saveAsData, response.filename);
};

export const getAssertsPath = (url) => {
  if (isNull(url)) {
    return null;
  }
  return urljoins(import.meta.env.VITE_ASSETS_URL, url);
};
