import { isArray, omit } from 'lodash';
import { v4 as uuidV4 } from 'uuid';

export const parseApilist = (list) => {
  const result = [];
  const digFlat = (dataList, parent_id = '0') => {
    const newList = dataList?.sort((a, b) => a.sort - b.sort);
    newList?.forEach((item) => {
      const newId = uuidV4();
      const newItem = {
        ...item,
        id: newId,
        parent_id,
      };
      result.push(omit(newItem, 'children'));
      if (isArray(item?.children)) {
        digFlat(item?.children, newId);
      }
    });
  };
  digFlat(list);
  return result;
};

export const parseModellist = (list) => {
  const result = [];
  const digFlat = (dataList, parent_id = '0') => {
    const newList = dataList?.sort((a, b) => a.sort - b.sort);
    newList?.forEach((item) => {
      const newId = uuidV4();
      const newItem = {
        ...item,
        id: newId,
        parent_id,
      };
      result.push(omit(newItem, 'children'));
      if (isArray(item?.children)) {
        digFlat(item?.children, newId);
      }
    });
  };
  digFlat(list);
  return result;
};

export const parseEnvlist = (list) => {
  const result = [];
  if (isArray(list)) {
    list
      ?.sort((a, b) => a.sort - b.sort)
      ?.forEach((item) => {
        result.push({
          ...item,
          env_id: uuidV4(),
        });
      });
  }
  return list?.sort((a, b) => a.sort - b.sort);
};
