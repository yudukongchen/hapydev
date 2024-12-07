import { isString, isUndefined } from 'lodash';
import { Buffer } from 'buffer/';

export const getRawBody = (response) => {
  if (!isUndefined(response?.changeBody)) {
    if (isString(response?.changeBody)) {
      return response?.changeBody;
    }
    return JSON.stringify(response?.changeBody);
  }
  if (isUndefined(response?.stream)) {
    return '';
  }
  const buffer = Buffer.from(response?.stream);
  return buffer.toString();
};
