import { isObject } from 'lodash';

export const storeSet = (key, value) => {
  if (isObject(value)) {
    localStorage.setItem(key, JSON.stringify(value));
    return;
  }
  localStorage.setItem(key, value);
};

export const storeGet = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch (ex) {}
  return localStorage.getItem(key);
};
