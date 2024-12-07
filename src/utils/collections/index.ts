import { BaseCollection } from '#types/collection/base';
import { isPlainObject } from 'lodash';

export const getParentApiFolders = (parent_id, api_datas: { [key: string]: BaseCollection }) => {
  const result = {};

  const digFind = (pid) => {
    const parentItem = api_datas?.[pid];
    if (!isPlainObject(parentItem)) {
      return;
    }
    result[parentItem.id] = parentItem;
    digFind(parentItem?.parent_id);
  };
  digFind(parent_id);
  return result;
};
