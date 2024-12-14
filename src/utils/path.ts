import { isUndefined } from 'lodash';

export const getPublicPath = () => {
  if (isUndefined(window?.electron)) {
    return location.origin;
  }
  if (window?.path) {
    return window?.path.join(window.__dirname, './');
  }
};
